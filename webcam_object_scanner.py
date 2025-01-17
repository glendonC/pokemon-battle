from ultralytics import YOLO
import cv2
from collections import deque
import numpy as np

class ObjectScanner:
    def __init__(self):
        # Load YOLO model
        self.model = YOLO("yolov8m.pt")
        
        # Initialize webcam
        self.cap = cv2.VideoCapture(0)
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
        
        # Target classes with human-readable labels
        self.target_classes = [
            'Bottle', 'Cell Phone', 'Book', 'Chair', 
            'Credit Card', 'Glasses', 'Headphones', 'Keys',
            'Laptop', 'Mouse', 'Pen', 'Wallet', 'Watch', 'Chair',
            'Other Item'
        ]
        
        # Settings
        self.roi_size = 0.5
        self.roi_active = True
        self.verification_mode = False
        self.edit_mode = False
        self.text_input_mode = False  # New: for custom item input
        self.custom_item_name = ""    # New: to store custom item name
        self.detected_object = None
        self.verified_object = None
        self.selected_index = 0
        self.object_detected = False
        self.excluded_classes = ['person', 'face', 'hand']
    
    def is_valid_detection(self, label, confidence):
        """Check if the detection is valid (not a person and meets confidence threshold)"""
        return (
            label not in self.excluded_classes and
            confidence >= 0.5  # Minimum confidence threshold
        )

    def draw_verification_ui(self, frame, detected_object):
        height, width = frame.shape[:2]
        ui_frame = frame.copy()

        # Add semi-transparent overlay for better text readability
        overlay = ui_frame.copy()
        cv2.rectangle(overlay, (0, height-300), (width, height), (0, 0, 0), -1)
        cv2.addWeighted(overlay, 0.7, ui_frame, 0.3, 0, ui_frame)

        if self.text_input_mode:
            # Text input UI
            cv2.putText(ui_frame, "Enter item name:", 
                       (50, height-280), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
            
            # Show current input with cursor
            cursor = "_" if (cv2.getTickCount() // 15000) % 2 else " "  # Blinking cursor
            cv2.putText(ui_frame, self.custom_item_name + cursor, 
                       (50, height-170), cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0, 255, 0), 2)
            
            # Instructions
            cv2.putText(ui_frame, "Type your item name and press ENTER", 
                       (50, height-70), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
            cv2.putText(ui_frame, "Press ESC to cancel", 
                       (50, height-30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 0, 0), 2)

        elif not self.edit_mode:
            if self.object_detected:
                cv2.putText(ui_frame, f"Detected: {detected_object}", 
                           (50, height-250), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
            else:
                cv2.putText(ui_frame, "No object detected", 
                           (50, height-250), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 165, 0), 2)
            
            cv2.putText(ui_frame, "Press 'Y' to confirm", 
                       (50, height-200), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)
            cv2.putText(ui_frame, "Press 'N' to retry", 
                       (50, height-150), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
            cv2.putText(ui_frame, "Press 'E' to manually select object", 
                       (50, height-100), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 165, 0), 2)
        else:
            # Selection mode UI
            cv2.putText(ui_frame, "Select object:", 
                       (50, height-280), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
            
            prev_idx = (self.selected_index - 1) % len(self.target_classes)
            next_idx = (self.selected_index + 1) % len(self.target_classes)
            
            # Previous option (dimmed)
            cv2.putText(ui_frame, self.target_classes[prev_idx], 
                       (50, height-220), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (128, 128, 128), 2)
            
            # Current selection (highlighted with arrow)
            cv2.putText(ui_frame, "-->", 
                       (50, height-170), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 0), 2)
            cv2.putText(ui_frame, self.target_classes[self.selected_index], 
                       (120, height-170), cv2.FONT_HERSHEY_SIMPLEX, 1.2, (255, 255, 0), 2)
            
            # Next option (dimmed)
            cv2.putText(ui_frame, self.target_classes[next_idx], 
                       (50, height-120), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (128, 128, 128), 2)
            
            cv2.putText(ui_frame, "Navigation: Press 'A' (previous) or 'D' (next)", 
                       (50, height-70), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
            cv2.putText(ui_frame, "Press ENTER to confirm selection", 
                       (50, height-30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

        return ui_frame

    def run(self):
        while True:
            ret, frame = self.cap.read()
            if not ret:
                break

            height, width, _ = frame.shape
            display_frame = frame.copy()

            if not self.verification_mode:
                # Define ROI
                if self.roi_active:
                    roi_width = int(width * self.roi_size)
                    roi_height = int(height * self.roi_size)
                    x1 = (width - roi_width) // 2
                    y1 = int(height * 0.1)
                    x2 = x1 + roi_width
                    y2 = y1 + roi_height
                    cv2.rectangle(display_frame, (x1, y1), (x2, y2), (0, 255, 0), 3)
                    roi = frame[y1:y2, x1:x2]
                else:
                    roi = frame

                # Instructions
                cv2.putText(display_frame, "Hold object in green box", 
                           (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
                cv2.putText(display_frame, "Press SPACE to capture", 
                           (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
                cv2.putText(display_frame, "Press 'R' to toggle scan area", 
                           (10, 90), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
                
                results = self.model(roi, conf=0.5)
                self.object_detected = False
                
                highest_conf = 0
                best_label = None
                
                for r in results:
                    boxes = r.boxes
                    for box in boxes:
                        cls = int(box.cls[0].item())
                        conf = float(box.conf[0].item())
                        label = self.model.names[cls]
                        
                        if not self.is_valid_detection(label, conf):
                            continue
                            
                        self.object_detected = True
                        x1_det, y1_det, x2_det, y2_det = map(int, box.xyxy[0].tolist())
                        
                        if self.roi_active:
                            x1_det += (width - roi_width) // 2
                            x2_det += (width - roi_width) // 2
                            y1_det += int(height * 0.1)
                            y2_det += int(height * 0.1)

                        cv2.rectangle(display_frame, (x1_det, y1_det), 
                                    (x2_det, y2_det), (255, 0, 0), 2)
                        cv2.putText(display_frame, f"{label} {conf:.2f}", 
                                  (x1_det, y1_det - 10), 
                                  cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 0, 0), 2)
                        
                        if conf > highest_conf:
                            highest_conf = conf
                            best_label = label

                if not self.object_detected:
                    cv2.putText(display_frame, "Hold object closer to camera", 
                               (width//4, height-30), cv2.FONT_HERSHEY_SIMPLEX, 
                               0.8, (0, 165, 255), 2)

            else:
                display_frame = self.draw_verification_ui(frame, self.detected_object)

            cv2.imshow('Object Scanner', display_frame)

            key = cv2.waitKey(1) & 0xFF
            
            if key == ord('q'):
                break
            elif key == ord('r') and not self.verification_mode:
                self.roi_active = not self.roi_active
            elif key == ord(' ') and not self.verification_mode:
                self.verification_mode = True
                if best_label:
                    self.detected_object = best_label
                else:
                    self.detected_object = "No object detected"
            elif key == ord('y') and self.verification_mode and not self.edit_mode:
                self.verified_object = self.detected_object
                break
            elif key == ord('n') and self.verification_mode:
                self.verification_mode = False
                self.edit_mode = False
                self.text_input_mode = False
                self.detected_object = None
            elif key == ord('e') and self.verification_mode and not self.edit_mode:
                self.edit_mode = True
                self.selected_index = 0
            elif self.edit_mode:
                if key == ord('d'):
                    self.selected_index = (self.selected_index + 1) % len(self.target_classes)
                elif key == ord('a'):
                    self.selected_index = (self.selected_index - 1) % len(self.target_classes)
                elif key == 13:  # Enter key
                    if self.target_classes[self.selected_index] == 'Other Item':
                        self.text_input_mode = True
                        self.edit_mode = False
                    else:
                        self.verified_object = self.target_classes[self.selected_index]
                        break
            elif self.text_input_mode:
                key = cv2.waitKey(100) & 0xFF  # Increase wait time to 100ms
                if key not in [255, -1]:  # Only process actual keystrokes
                    print(f"Key pressed in text mode: {key}")  # Keep debug print
                    if key == 27:  # ESC key
                        print("ESC pressed")
                        self.text_input_mode = False
                        self.edit_mode = True
                        self.custom_item_name = ""
                    elif key in [13, 10]:  # Enter key
                        print("ENTER pressed")
                        if self.custom_item_name.strip():
                            self.verified_object = self.custom_item_name.strip()
                            break
                    elif key in [8, 127]:  # Backspace
                        print("BACKSPACE pressed")
                        self.custom_item_name = self.custom_item_name[:-1]
                    elif 32 <= key <= 126:  # Printable ASCII
                        print(f"Adding character: {chr(key)}")
                        if len(self.custom_item_name) < 20:
                            self.custom_item_name += chr(key)

        self.cap.release()
        cv2.destroyAllWindows()
        return self.verified_object

if __name__ == "__main__":
    scanner = ObjectScanner()
    verified_object = scanner.run()
    if verified_object:
        print(f"\nFinal selection: {verified_object}")
    else:
        print("\nScanning cancelled")