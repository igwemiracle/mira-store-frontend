import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "../services/orderService";
import { getTrendingProducts } from "../services/productService";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import { LoadingSpinner } from "../components/UI/LoadingSpinner";

export default function Orders() {
  const [activeTab, setActiveTab] = useState("orders");

  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getMyOrders,
    select: (res) => res.data.orders,
  });


  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-red-500">Error loading orders.</p>
      </div>
    );

  return (

    <>

      {/* MAIN WRAPPER */}
      <div className="w-full mx-auto max-w-6xl px-2 sm:px-4 md:px-6 lg:px-8 py-6 mt-24">


        <div className="flex lg:flex-row lg:items-center lg:justify-between xs:flex-col my-4 gap-4">
          {/* PAGE HEADING */}
          <h1 className="lg:text-4xl xs:text-2xl font-bold text-gray-900">
            Your Orders
          </h1>

          <div className="lg:w-[50%] xs:w-full">
            <SearchBar
              className="border border-gray-300 w-full"
              placeholder="Search all orders"
              onSearch={() => {
                console.log("Search clicked!");
              }}
            />
          </div>
        </div>

        {/* FILTER ROW */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {/* Past Months Filter */}
          <select className="border border-gray-300 rounded-md text-xs sm:text-sm px-2 py-1.5">
            <option>Past 3 months</option>
            <option>Past 6 months</option>
            <option>Past year</option>
            <option>2023 Orders</option>
          </select>

          {/* Order Type Filter */}
          <select className="border border-gray-300 rounded-md text-xs sm:text-sm px-2 py-1.5">
            <option>All Orders</option>
            <option>Digital Orders</option>
            <option>Local Store Orders</option>
            <option>Cancelled Orders</option>
          </select>


        </div>

        {/* TABS */}
        <div className="flex items-center gap-6 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("orders")}
            className={`relative text-sm sm:text-base pb-2 ${activeTab === "orders"
              ? "font-bold text-black border-b-2 border-yellow-500"
              : "text-blue-600 hover:underline"
              }`}
          >
            Orders
          </button>

          <button
            onClick={() => setActiveTab("buyAgain")}
            className={`relative text-sm sm:text-base pb-2 ${activeTab === "buyAgain"
              ? "font-bold text-black border-b-2 border-yellow-500"
              : "text-blue-600 hover:underline"
              }`}
          >
            Buy Again
          </button>

          <button
            onClick={() => setActiveTab("notYetShipped")}
            className={`relative text-sm sm:text-base pb-2 ${activeTab === "notYetShipped"
              ? "font-bold text-black border-b-2 border-yellow-500"
              : "text-blue-600 hover:underline"
              }`}
          >
            Not Yet Shipped
          </button>

          <button
            onClick={() => setActiveTab("cancelledOrders")}
            className={`relative text-sm sm:text-base pb-2 ${activeTab === "cancelledOrders"
              ? "font-bold text-black border-b-2 border-yellow-500"
              : "text-blue-600 hover:underline"
              }`}
          >
            Cancelled Orders
          </button>
        </div>


        {/* TAB CONTENT */}
        {activeTab === "orders" && (
          <>
            {orders.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500">You have no orders yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={String(order._id)}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm"
                  >
                    {/* HEADER – ORDER INFO */}
                    <div className="bg-gray-100 flex flex-wrap justify-between items-center px-4 py-3 rounded-t-lg text-xs sm:text-sm">
                      <div className="flex sm:flex-row sm:items-center gap-12 sm:gap-6">
                        <div>
                          <span className="text-gray-500 block">ORDER PLACED</span>
                          <span className="font-medium text-gray-700">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">TOTAL</span>
                          <span className="font-medium text-gray-700">
                            ${order.total.toFixed(2)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">SHIP TO</span>
                          <span className="font-medium text-gray-700">
                            {order.user?.name || "You"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* PRODUCT(S) */}
                    <div className="px-4 py-4">
                      <p className="text-sm font-semibold mb-3">
                        {order.status === "completed"
                          ? "Delivered"
                          : order.status === "pending"
                            ? "Arriving Soon"
                            : "Processing"}
                      </p>

                      <div className="flex flex-wrap gap-4">
                        {/* LEFT IMAGE */}
                        {order.orderItems.slice(0, 1).map((item) => (
                          <img
                            key={String(item.product?._id || item._id)}
                            src={
                              item.product?.images?.[0]?.url ||
                              "https://placehold.co/150x150?text=No+Image"
                            }
                            alt={item.product?.name || "Product"}
                            className="w-24 h-24 object-contain border rounded"
                          />
                        ))}

                        {/* RIGHT INFO */}
                        <div className="flex-1">
                          <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                            {order.orderItems[0].product?.name || "Product name"}
                          </h2>
                          <p className="text-xs text-gray-600 mb-3">
                            Quantity: {order.orderItems[0].quantity}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-xs sm:text-sm font-medium py-1.5 px-3 rounded-full">
                              Track package
                            </button>
                            <button className="border border-gray-300 hover:bg-gray-100 text-xs sm:text-sm py-1.5 px-3 rounded-full">
                              Return or replace items
                            </button>
                            <button className="border border-gray-300 hover:bg-gray-100 text-xs sm:text-sm py-1.5 px-3 rounded-full">
                              Leave product review
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* MULTIPLE ITEMS NOTICE */}
                      {order.orderItems.length > 1 && (
                        <div className="mt-4 text-xs text-gray-500">
                          +{order.orderItems.length - 1} more items in this order
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "buyAgain" && (
          <div className="p-6 text-center">
            <p className="text-gray-500">
              Items you can buy again will show up here.
            </p>
          </div>
        )}

        {activeTab === "notYetShipped" && (
          <div className="p-6 text-center">
            <p className="text-gray-500">Not yet shipped orders will appear here.</p>
          </div>
        )}

        {activeTab === "cancelledOrders" && (
          <div className="p-6 text-center">
            <p className="text-gray-500">Cancelled orders will appear here.</p>
          </div>
        )}
      </div>

    </>
  );
}
