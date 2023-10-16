import PropTypes from "prop-types";
import { FaEye } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Coffee = ({ coffee, coffees, setCoffees }) => {
    const { _id, coffeeName, chef, supplier, taste, category, details, photo } = coffee;

    const deleteCoffee = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/coffee/${id}`, { method: "DELETE" })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                "Deleted!",
                                "Your coffee has been deleted.",
                                "success"
                            );
                            const updatedCoffees = coffees.filter(cof => cof._id !== id);
                            setCoffees(updatedCoffees);
                        }
                    })
                    .catch(err => console.log(err.message));
            }
        });
    };

    return (
        <div className="card card-side bg-[#F5F4F1] shadow-xl p-5">
            <figure><img src={photo} alt="coffee" /></figure>
            <div className="flex items-center justify-between w-full p-5 font-raleway">
                <div>
                    <h2 className="card-title mb-1">Name: {coffeeName}</h2>
                    <p>Chef: {chef}, Supplier: {supplier}</p>
                    <p>{taste}, {category}</p>
                    <p>{details}</p>
                </div>
                <div className="card-actions">
                    <div className="join join-vertical space-y-1">
                        <button title="View" className="btn join-item text-white bg-[#D2B48C] hover:bg-[#D2B48C]"><FaEye className="text-xl"></FaEye></button>
                        <Link to={`/update-coffee/${_id}`}>
                            <button title="Update" className="btn join-item text-white bg-[#3C393B] hover:bg-[#3C393B]"><FiEdit2 className="text-xl"></FiEdit2></button>
                        </Link>
                        <button title="Delete" onClick={() => deleteCoffee(_id)} className="btn join-item text-white bg-[#EA4744] hover:bg-[#EA4744]"><MdDelete className="text-xl"></MdDelete></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

Coffee.propTypes = {
    coffee: PropTypes.object.isRequired,
    coffees: PropTypes.array.isRequired,
    setCoffees: PropTypes.func.isRequired
};

export default Coffee;