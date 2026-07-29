from agents.triage_agent import TriageAgent
from agents.inventory_agent import InventoryAgent
from agents.coldchain_agent import ColdChainAgent
from agents.logistics_agent import LogisticsAgent


class MediRouteWorkflow:

    def process_request(self, disease, medicine, quantity, temperature, db):

        triage = TriageAgent()
        inventory = InventoryAgent()
        coldchain = ColdChainAgent()
        logistics = LogisticsAgent()

        priority = triage.calculate_priority(disease)

        medicine_result = inventory.check_inventory(
            medicine,
            quantity,
            db
        )

        temperature_result = coldchain.check_temperature(temperature)

        route = logistics.find_route(
            "Central Hospital",
            "Village Hospital"
        )

        return {
            "priority": priority,
            "medicine": medicine_result,
            "temperature": temperature_result,
            "route": route
        }