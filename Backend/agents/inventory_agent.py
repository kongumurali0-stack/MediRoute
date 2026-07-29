class InventoryAgent:

    def check_inventory(self, medicine, quantity, db):

        from database.models import Inventory

        item = (
            db.query(Inventory)
            .filter(Inventory.medicine == medicine)
            .first()
        )

        if item is None:
            return {
                "status": "Medicine Not Found"
            }

        if item.quantity >= quantity:
            item.quantity -= quantity
            db.commit()

            return {
                "status": "Allocated",
                "remaining_stock": item.quantity
            }

        return {
            "status": "Out of Stock",
            "available": item.quantity
        }
        