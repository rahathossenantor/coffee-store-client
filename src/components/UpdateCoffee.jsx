import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateCoffee = () => {
    const { _id, coffeeName, chef, supplier, taste, category, details, photo } = useLoaderData();

    // update coffee
    const modifyCoffee = async (e) => {
        e.preventDefault();
        const formData = e.target;

        const coffeeName = formData.coffeeName.value;
        const chef = formData.chef.value;
        const supplier = formData.supplier.value;
        const taste = formData.taste.value;
        const category = formData.category.value;
        const details = formData.details.value;
        const photo = formData.photo.value;
        const coffee = { coffeeName, chef, supplier, taste, category, details, photo };

        try {
            const res = await fetch(`http://localhost:5000/modify-coffee/${_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(coffee)
            });
            const result = await res.json();
            if (result.modifiedCount > 0) {
                Swal.fire({
                    title: "Success!",
                    text: "Successfully updated",
                    icon: "success",
                    confirmButtonText: "Close"
                });
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="md:container md:mx-auto 2xl:px-0 xl:px-0 lg:px-5 md:px-5 px-5">
            <Link to="/"><button className="btn normal-case font-rancho text-lg">Back to home</button></Link>
            <div className="border p-20 my-10 bg-[#F4F3F0] rounded-md">
                <div className="text-center">
                    <h2 className="font-rancho text-4xl font-semibold mb-2 text-[#374151]">Modify Coffee</h2>
                    <p className="font-raleway mb-5">It is a long established fact that a reader will be distraceted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.</p>
                </div>
                <form onSubmit={modifyCoffee} className="font-raleway">
                    {/* first row */}
                    <div className="flex gap-5 mb-5">
                        <div className="w-1/2">
                            <label htmlFor="coffeeName" className="font-semibold text-lg text-[#1b1a1acc]">Name</label>
                            <input type="text" defaultValue={coffeeName} placeholder="Enter coffee name" id="coffeeName" name="coffeeName" className="input input-bordered w-full" />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="chef" className="font-semibold text-lg text-[#1b1a1acc]">Chef</label>
                            <input type="text" defaultValue={chef} placeholder="Enter coffee chef" id="chef" name="chef" className="input input-bordered w-full" />
                        </div>
                    </div>
                    {/* second row */}
                    <div className="flex gap-5 mb-5">
                        <div className="w-1/2">
                            <label htmlFor="supplier" className="font-semibold text-lg text-[#1b1a1acc]">Supplier</label>
                            <input type="text" defaultValue={supplier} placeholder="Enter coffee supplier" id="supplier" name="supplier" className="input input-bordered w-full" />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="taste" className="font-semibold text-lg text-[#1b1a1acc]">Taste</label>
                            <input type="text" defaultValue={taste} placeholder="Enter coffee taste" id="taste" name="taste" className="input input-bordered w-full" />
                        </div>
                    </div>
                    {/* third row */}
                    <div className="flex gap-5 mb-5">
                        <div className="w-1/2">
                            <label htmlFor="category" className="font-semibold text-lg text-[#1b1a1acc]">Category</label>
                            <input type="text" defaultValue={category} placeholder="Enter coffee category" id="category" name="category" className="input input-bordered w-full" />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="details" className="font-semibold text-lg text-[#1b1a1acc]">Details</label>
                            <input type="text" defaultValue={details} placeholder="Enter coffee details" id="details" name="details" className="input input-bordered w-full" />
                        </div>
                    </div>
                    {/* fourth row */}
                    <div className="mb-5">
                        <label htmlFor="photo" className="font-semibold text-lg text-[#1b1a1acc]">Photo</label>
                        <input type="text" defaultValue={photo} placeholder="Enter photo URL" id="photo" name="photo" className="input input-bordered w-full" />
                    </div>
                    <input type="submit" value="Modify Coffee" className="btn btn-block normal-case font-rancho text-lg text-[#331A15] bg-[#D2B48C] hover:bg-[#D2B48C] hover:border-[#331A15] border-[#331A15]" />
                </form>
            </div>
        </div>
    );
};

export default UpdateCoffee;
