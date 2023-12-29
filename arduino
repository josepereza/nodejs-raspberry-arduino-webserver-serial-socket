const int LEDPin = 13;
const int LDRPin = A2;
const int threshold = 800;

void setup() {
  Serial.begin(9600);
  pinMode(LEDPin, OUTPUT);
  pinMode(LDRPin, INPUT);
}

void loop() {
  int input = analogRead(LDRPin);
   Serial.println(input);  
  if (input < threshold) {
    digitalWrite(LEDPin, HIGH);
  }
  else {
    digitalWrite(LEDPin, LOW);
  }
}
