import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Zap, Send, Bot, User, Loader2, Settings } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: string;
  status: string;
  service: string;
  timestamp: string;
  source: string;
}

interface ChatInterfaceProps {
  alerts: Alert[];
}

const ChatInterface = ({ alerts }: ChatInterfaceProps) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI alert assistant. I can help you analyze your alerts, identify patterns, and suggest optimizations. What would you like to know about your system alerts?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAlertContext = () => {
    const activeAlerts = alerts.filter(alert => alert.status === "active");
    const criticalAlerts = alerts.filter(alert => alert.severity === "critical");
    
    return `Current system status:
- Total alerts: ${alerts.length}
- Active alerts: ${activeAlerts.length}
- Critical alerts: ${criticalAlerts.length}
- Recent alerts: ${alerts.slice(0, 3).map(a => `${a.title} (${a.severity})`).join(", ")}
- Services with issues: ${[...new Set(alerts.map(a => a.service))].join(", ")}`;
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    if (!apiKey) {
      setShowApiKeyInput(true);
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to use the AI assistant.",
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are an AI assistant specialized in analyzing system alerts and monitoring. You help users understand their alerts, identify patterns, and suggest solutions. Here's the current system context: ${getAlertContext()}. Be concise and practical in your responses.`,
            },
            ...messages.slice(-5).map(msg => ({
              role: msg.isUser ? "user" : "assistant",
              content: msg.content,
            })),
            {
              role: "user",
              content: inputMessage,
            },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || "Sorry, I couldn't process your request.";

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="space-y-4">
      {/* API Key Input */}
      {showApiKeyInput && (
        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <div className="flex items-start gap-3">
            <Settings className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                  OpenAI API Key Required
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                  Enter your OpenAI API key to enable AI-powered alert analysis. Your key is stored locally and only used for this session.
                </p>
              </div>
              <div className="flex gap-2">
                <Input
                  type="password"
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="flex-1"
                />
                <Button
                  size="sm"
                  onClick={() => {
                    if (apiKey.trim()) {
                      setShowApiKeyInput(false);
                      toast({
                        title: "API Key Set",
                        description: "You can now chat with the AI assistant!",
                      });
                    }
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <ScrollArea className="h-96 pr-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              {!message.isUser && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-md p-3 rounded-lg ${
                  message.isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-60 mt-1">
                  {formatTime(message.timestamp)}
                </p>
              </div>

              {message.isUser && (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <p className="text-sm">AI is thinking...</p>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <Badge
          variant="outline"
          className="cursor-pointer hover:bg-primary/10"
          onClick={() => setInputMessage("Analyze the critical alerts and suggest immediate actions")}
        >
          Analyze Critical Alerts
        </Badge>
        <Badge
          variant="outline"
          className="cursor-pointer hover:bg-primary/10"
          onClick={() => setInputMessage("What are the most common alert patterns?")}
        >
          Alert Patterns
        </Badge>
        <Badge
          variant="outline"
          className="cursor-pointer hover:bg-primary/10"
          onClick={() => setInputMessage("Suggest optimizations to reduce false positives")}
        >
          Reduce False Positives
        </Badge>
      </div>

      {/* Message Input */}
      <div className="flex gap-2">
        <Input
          placeholder="Ask about alerts, trends, or optimizations..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
          disabled={isLoading}
        />
        <Button
          size="sm"
          onClick={sendMessage}
          disabled={isLoading || !inputMessage.trim()}
          className="px-4"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;