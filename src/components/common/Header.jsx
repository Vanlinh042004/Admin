import { motion } from "framer-motion"; // Added framer-motion

const Header = ({ title }) => {
  return (
    <motion.header
      className="bg-gray-900 text-white p-4 shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold">{title}</h1>
    </motion.header>
  );
};

export default Header;
