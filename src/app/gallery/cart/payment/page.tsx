import Payment from "@/app/components/Payment/Payment";

export default function PaymentPage() {
    return (
        <div className="flex flex-col w-full gap-y-8 text-[3vw]">
            <h2 className="text-center font-bold">One Step Away from Your Photos!</h2>

            {/* Recap */}
            <div className="flex flex-col items-center w-full gap-y-1">
                <div className="flex justify-between items-center w-full">
                    <span>Number of photos purchased:</span>
                    <span>{3}</span>
                </div>
                <div className="flex justify-between items-center w-full">
                    <span>Total:</span>
                    <span className="text-mygreen text-[4vw] font-bold">15,99€</span>
                </div>
                <p>🔒 Secure payment with SSL encryption.</p>
            </div>

            <Payment />
        </div>
    );
}
