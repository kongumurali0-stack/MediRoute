class ColdChainAgent:

    def check_temperature(self, temperature):

        if 2 <= temperature <= 8:
            return "Safe"

        return "Unsafe"