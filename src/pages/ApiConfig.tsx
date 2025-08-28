import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Key, Save, Trash2 } from "lucide-react";

const ApiConfig = () => {
  const [apiKey, setApiKey] = useState("");
  const [isConfigured, setIsConfigured] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if API key exists in localStorage
    const storedApiKey = localStorage.getItem("openai_api_key");
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setIsConfigured(true);
    }
  }, []);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey.startsWith("sk-")) {
      toast({
        title: "Invalid API Key",
        description: "OpenAI API keys should start with 'sk-'",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("openai_api_key", apiKey);
    setIsConfigured(true);
    toast({
      title: "Success",
      description: "OpenAI API key saved successfully",
    });
  };

  const handleRemove = () => {
    localStorage.removeItem("openai_api_key");
    setApiKey("");
    setIsConfigured(false);
    toast({
      title: "Removed",
      description: "OpenAI API key removed from local storage",
    });
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return key;
    return key.substring(0, 8) + "•".repeat(key.length - 12) + key.substring(key.length - 4);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">OpenAI API Configuration</h1>
            <p className="text-muted-foreground">
              Configure your OpenAI API key to enable AI features in the application
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Key Configuration
              </CardTitle>
              <CardDescription>
                Your API key is stored locally in your browser and never sent to our servers.
                Get your API key from{" "}
                <a 
                  href="https://platform.openai.com/api-keys" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  OpenAI Platform
                </a>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="apiKey">OpenAI API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="font-mono"
                />
                {isConfigured && (
                  <p className="text-sm text-muted-foreground">
                    Current key: {maskApiKey(apiKey)}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleSave} 
                  className="flex items-center gap-2"
                  disabled={!apiKey.trim()}
                >
                  <Save className="h-4 w-4" />
                  Save API Key
                </Button>
                
                {isConfigured && (
                  <Button 
                    variant="destructive" 
                    onClick={handleRemove}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove Key
                  </Button>
                )}
              </div>

              {isConfigured && (
                <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    ✅ API key is configured and ready to use
                  </p>
                </div>
              )}

              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="font-medium">Security Notes:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Your API key is stored only in your browser's local storage</li>
                  <li>• The key is never transmitted to our servers</li>
                  <li>• Clear your browser data to remove the stored key</li>
                  <li>• Keep your API key secure and don't share it with others</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApiConfig;