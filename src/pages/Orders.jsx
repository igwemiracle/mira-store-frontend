import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "../services/orderService";

export default function Orders() {
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getMyOrders,
    select: (res) => res.data.orders, // Extract orders directly
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
    <div className="max-w-6xl mx-auto px-4 xs:px-3 sm:px-6 lg:px-8 mt-36">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">No orders found.</p>
        </div>
      ) : (
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-3">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${order.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                    }`}
                >
                  {order.status}
                </span>
                <span className="text-sm text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Order Total */}
              <p className="text-lg font-bold text-gray-900 mb-3">
                ${order.total.toFixed(2)}
              </p>

              {/* Order Items */}
              <ul className="space-y-2 text-sm text-gray-700 flex-1">
                {order.orderItems.map((item) => (
                  <li
                    key={item.product}
                    className="flex justify-between items-center border-b last:border-none pb-1"
                  >
                    <span>
                      {item.name} <span className="text-gray-500">x{item.quantity}</span>
                    </span>
                    <span className="font-medium">${item.amount.toFixed(2)}</span>
                  </li>
                ))}
              </ul>

              {/* Footer */}
              <div className="mt-4 text-xs text-gray-500">
                Order ID: <span className="font-mono">{order._id}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
