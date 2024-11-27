import { motion } from "framer-motion";
import { Check , Search, Trash2 } from "lucide-react";
import { useState } from "react";

const CLASS_REQUEST_DATA = [
	{ id: 1, subject: "Math", grade: "12", address: "20 Tăng Nhơn Phú, Phước Long B, Tp. Thủ Đức, Hồ Chí Minh 715939, Vietnam" , price: 59.99, time : 2, time_week: 3, require: "student/men", by: "offline", phone: "0123456789"},
];

const ProductsTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredClass, setFilteredClass] = useState(CLASS_REQUEST_DATA);

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = CLASS_REQUEST_DATA.filter(
			(product) => product.subject.toLowerCase().includes(term) || product.grade.toLowerCase().includes(term)
		);

		setFilteredClass(filtered);
	};

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Request Class List</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Search products...'
						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						onChange={handleSearch}
						value={searchTerm}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				</div>
			</div>
			

			{/* --------Thông tin------------------------------ */}
			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Subject
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Grade
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-32:'>
								Address
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Price
							</th>							
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Time
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								times a week
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Require
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								by
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Phone
							</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{filteredClass.map((product) => (
							<motion.tr
								key={product.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>

								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
								{product.subject}
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{product.grade}
								</td>

								<td className='px-6 py-4 whitespace-normal break-words text-sm text-gray-300 w-[250px]'>
									{product.address}
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									${product.price.toFixed(2)}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{product.time}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{product.time_week}
								</td>

								<td className='px-6 py-4 whitespace-normal break-words text-sm text-gray-300 w-[150px]'>
									{product.require}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{product.by}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{product.phone}
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									<button className='text-indigo-400 hover:text-indigo-300 mr-2'>
										<Check  size={30} />
									</button>
									<button className='text-red-400 hover:text-red-300'>
										<Trash2 size={30} />
									</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};
export default ProductsTable;
