class AllocationAgent:

    def allocate_medicine(self, medicine, quantity):

        inventory = {
            "Blood": 10,
            "Vaccine": 20,
            "Paracetamol": 100
        }

        available = inventory.get(medicine, 0)

        if available >= quantity:
            return {
                "status": "Allocated",
                "available": available
            }
        else:
            return {
                "status": "Not Available",
                "available": available
            }