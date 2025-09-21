import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TestTube, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateTestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateTestModal = ({ open, onOpenChange }: CreateTestModalProps) => {
  const { toast } = useToast();
  const [testName, setTestName] = useState("");
  const [testSuite, setTestSuite] = useState("");
  const [testType, setTestType] = useState("");
  const [description, setDescription] = useState("");

  const testSuites = [
    "API Integration Tests",
    "UI End-to-End Tests", 
    "Performance Tests",
    "Security Tests",
    "Load Tests"
  ];

  const testTypes = [
    "Unit Test",
    "Integration Test",
    "End-to-End Test",
    "Performance Test",
    "Security Test"
  ];

  const handleCreateTest = () => {
    if (!testName || !testSuite || !testType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Test Created",
      description: `${testName} has been added to ${testSuite}.`,
    });

    // Reset form
    setTestName("");
    setTestSuite("");
    setTestType("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <TestTube className="h-5 w-5 text-primary" />
            </div>
            Create New Test
          </DialogTitle>
          <DialogDescription>
            Add a new test case to your testing suite. Fill in the details below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="testName">Test Name *</Label>
            <Input
              id="testName"
              placeholder="Enter test name"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              className="focus-ring"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="testSuite">Test Suite *</Label>
            <Select value={testSuite} onValueChange={setTestSuite}>
              <SelectTrigger className="focus-ring">
                <SelectValue placeholder="Select test suite" />
              </SelectTrigger>
              <SelectContent>
                {testSuites.map((suite) => (
                  <SelectItem key={suite} value={suite}>
                    {suite}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="testType">Test Type *</Label>
            <Select value={testType} onValueChange={setTestType}>
              <SelectTrigger className="focus-ring">
                <SelectValue placeholder="Select test type" />
              </SelectTrigger>
              <SelectContent>
                {testTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what this test validates..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="focus-ring min-h-[80px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleCreateTest} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Create Test
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTestModal;