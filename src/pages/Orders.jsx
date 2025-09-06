import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "../services/orderService";
import { ShoppingBag } from "lucide-react";

export default function Orders() {
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getMyOrders,
    select: (res) => res.data.orders,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-600">Loading orders...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-red-500">Error loading orders.</p>
      </div>
    );

  return (
    <div className="w-[90%] mx-auto flex mt-36">
      {/* Main Orders Section */}
      <div className="basis-[80%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Your Orders
        </h1>

        {/* Sub Navigation */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-700 border-b border-gray-300 pb-3 mb-6">
          <button className="font-semibold border-b-2 border-yellow-500 pb-1">
            Orders
          </button>
          <button className="hover:text-yellow-600">Buy Again</button>
          <button className="hover:text-yellow-600">Not Yet Dispatched</button>
          <button className="hover:text-yellow-600">Local Store Orders</button>
          <button className="hover:text-yellow-600">Cancelled Orders</button>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500">No orders found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border border-gray-200 rounded-md shadow-sm"
              >
                {/* Order Info Header */}
                <div className="bg-gray-200 px-4 py-3 text-sm flex flex-wrap gap-10 border-b border-gray-200">
                  <div>
                    <span className="font-medium text-gray-700">
                      ORDER PLACED
                    </span>
                    <div>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">TOTAL</span>
                    <div>${order.total.toFixed(2)}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      DISPATCH TO
                    </span>
                    <div>{order.user?.name || "You"}</div>
                  </div>
                  <div className="ml-auto">
                    <span className="font-medium text-gray-700">ORDER ID</span>
                    <div className="text-gray-600"># {order._id}</div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="flex justify-between p-4">
                  {/* Left: Order Products */}
                  <div className="basis-[75%] space-y-4">
                    <h1 className="font-bold capitalize">
                      {order.status === "completed"
                        ? "Delivered"
                        : order.status === "pending"
                          ? "Arriving Soon"
                          : "Processing"}
                    </h1>

                    {order.orderItems.map((item) => {
                      return (
                        <div key={item.product} className="flex gap-3">
                          <img
                            src={item.product?.images?.[0]?.url || "https://placehold.co/300x300?text=No+Image"}
                            alt={item.product?.name || "Product"}
                            className="w-40 h-auto object-contain border rounded"
                          />

                          <div className="space-y-3">
                            <p className="w-[90%]">{item.name}</p>
                            <p className="text-gray-500 text-sm">
                              Quantity: {item.quantity}
                            </p>
                            <button className="border border-gray-300 py-1.5 px-3 rounded-3xl flex items-center gap-2 text-sm">
                              <ShoppingBag size={16} />
                              Buy it again
                            </button>
                          </div>
                        </div>
                      )
                    }
                    )}
                  </div>

                  {/* Right: Action Buttons */}
                  <div className="basis-[25%] flex flex-col gap-4">
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm font-semibold py-1.5 px-3 rounded-3xl">
                      Track package
                    </button>
                    <button className="border border-gray-300 hover:bg-gray-100 text-sm py-1.5 px-3 rounded-3xl">
                      View or edit order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Sidebar (Optional) */}
      <div className="basis-[20%] bg-red-200">
        {/* You can add "Buy Again" suggestions, ads, or recommendations here */}
        hh
      </div>
    </div>
  );
}
