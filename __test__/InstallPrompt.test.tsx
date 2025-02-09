import "@testing-library/jest-dom"; // Import this at the top
import InstallPrompt from "@/components/InstallPrompt";
import { render, screen, fireEvent, act } from "@testing-library/react";

// Mock matchMedia to simulate a non-installed state
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false, // Simulate app NOT installed
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

describe("InstallPrompt", () => {
    test("should display the install popup when beforeinstallprompt is triggered", async () => {
        render(<InstallPrompt />);
    
        // Mock `beforeinstallprompt` event
        const mockEvent = new Event("beforeinstallprompt") as any;
        mockEvent.preventDefault = jest.fn();
        mockEvent.prompt = jest.fn();
        mockEvent.userChoice = Promise.resolve({ outcome: "accepted" });
    
        // Dispatch the event inside `act`
        act(() => {
          window.dispatchEvent(mockEvent);
        });
    
        // Wait for the install message to appear
        const installMessage = await screen.findByText("Install this app on your device for a better experience.");
        expect(installMessage).toBeInTheDocument();
      });
  
    it("should call prompt() when the install button is clicked", async () => {
      render(<InstallPrompt />);
  
      const mockEvent = new Event("beforeinstallprompt") as any;
      mockEvent.preventDefault = jest.fn();
      mockEvent.prompt = jest.fn();
  
      act(() => {
        window.dispatchEvent(mockEvent);
      });
  
      const installButton = await screen.findByText("Install");
  
      act(() => {
        fireEvent.click(installButton);
      });
  
      expect(mockEvent.prompt).toHaveBeenCalled();
    });
  });