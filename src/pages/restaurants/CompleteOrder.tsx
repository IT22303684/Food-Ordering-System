import ResturentTable from "../../components/UI/ResturentOrderTable";
import ResturentTitle from "../../components/UI/ResturentTitle";

  export interface Order {
    orderId: string;
    customerName: string;
    items: string;
    totalAmount: string;
    orderTime: string;
    status: string;
    action: string;
  }
  
  // Define your data
  const tableHeaders: string[] = [
    "Order ID",
    "Customer Name",
    "Items",
    "Total Amount",
    "Order Time",
    "Status",
    "Action"
  ];
  
  const orderData: Order[] = [
    {
      orderId: "ORD001",
      customerName: "John Smith",
      items: "Pepperoni Pizza, Coke",
      totalAmount: "$18.99",
      orderTime: "2025-03-29 12:30 PM",
      status: "Delivered",
      action: "Change Status"
    },
    {
      orderId: "ORD002",
      customerName: "Sarah Johnson",
      items: "Chicken Burger, Fries",
      totalAmount: "$15.50",
      orderTime: "2025-03-29 12:45 PM",
      status: "Delivered",
      action: "Change Status"
    },
    {
      orderId: "ORD003",
      customerName: "Mike Wilson",
      items: "Pasta Alfredo, Salad",
      totalAmount: "$22.75",
      orderTime: "2025-03-29 1:00 PM",
      status: "Delivered",
      action: "Change Status"
    }
  ];

const CompleteOrder = () => {
  return (
    <div className='p-4'>
        <ResturentTitle text="Complete Orders"/>
        <ResturentTable headers={tableHeaders} data={orderData} />
    </div>
  )
}

export default CompleteOrder
