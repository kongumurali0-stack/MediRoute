class TriageAgent:

    def calculate_priority(self, disease):
        disease = disease.lower()

        if disease == "heart attack":
            return "High"

        elif disease == "accident":
            return "High"

        elif disease == "fracture":
            return "Medium"

        else:
            return "Low"