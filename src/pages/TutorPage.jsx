import { CheckCircle} from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import RequestTable from "../components/tutor/RequestTable";
import TutorTable from "../components/tutor/TutorTable";

const orderStats = {
	completedOrders: "1,178"
};

const OrdersPage = () => {
	return (
		<div className='flex-1 relative z-10 overflow-auto'>
			<Header title={"Tutor"} />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					
					<StatCard
						name='Total Tutor'
						icon={CheckCircle}
						value={orderStats.completedOrders}
						color='#10B981'
					/>
				</motion.div>
				<RequestTable />
				<TutorTable />
			</main>
		</div>
	);
};
export default OrdersPage;
