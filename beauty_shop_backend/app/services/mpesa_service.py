"""
M-Pesa Service - Placeholder Implementation
Replace with actual Safaricom Daraja API integration when ready
"""
from typing import Dict, Any

class MpesaService:
    def initiate_stk_push(
        self, 
        phone_number: str, 
        amount: float, 
        account_reference: str, 
        transaction_desc: str
    ) -> Dict[str, Any]:
        """Dummy STK Push implementation for development"""
        return {
            "success": True,
            "message": "STK Push initiated successfully (TEST MODE)",
            "checkout_request_id": "ws_CO_010120240000000000",
            "merchant_request_id": "872635263526352635"
        }
    
    def query_transaction_status(self, checkout_request_id: str) -> Dict[str, Any]:
        """Dummy transaction status check"""
        return {
            "success": True,
            "status": "Completed",
            "message": "Transaction completed successfully (TEST MODE)",
            "amount": 100.0,
            "phone_number": "2547XXXXXXXX"
        }
    
    def process_callback(self, callback_data: Dict[str, Any]) -> Dict[str, Any]:
        """Handle M-Pesa callback"""
        return {
            "success": True,
            "message": "Callback processed successfully (TEST MODE)"
        }

# Singleton instance to import
mpesa_service = MpesaService()