import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CreateCoffee = () => {

    // add new coffee
    const addCoffee = async (e) => {
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
            const res = await fetch("http://localhost:5000/add-coffee", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(coffee)
            });
            const result = await res.json();
            if (result.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: "Successfully added",
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
            <div className="border p-20 my-20">
                <div className="text-center">
                    <h2 className="font-rancho text-4xl font-semibold mb-2">Add New Coffee</h2>
                    <p className="font-raleway mb-5">It is a long established fact that a reader will be distraceted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.</p>
                </div>
                <form onSubmit={addCoffee} className="font-raleway">
                    {/* first row */}
                    <div className="flex gap-5 mb-5">
                        <div className="w-1/2">
                            <label htmlFor="coffeeName" className="font-semibold text-lg">Name</label>
                            <input type="text" placeholder="Enter coffee name" id="coffeeName" name="coffeeName" className="input input-bordered w-full" />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="chef" className="font-semibold text-lg">Chef</label>
                            <input type="text" placeholder="Enter coffee chef" id="chef" name="chef" className="input input-bordered w-full" />
                        </div>
                    </div>
                    {/* second row */}
                    <div className="flex gap-5 mb-5">
                        <div className="w-1/2">
                            <label htmlFor="supplier" className="font-semibold text-lg">Supplier</label>
                            <input type="text" placeholder="Enter coffee supplier" id="supplier" name="supplier" className="input input-bordered w-full" />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="taste" className="font-semibold text-lg">Taste</label>
                            <input type="text" placeholder="Enter coffee taste" id="taste" name="taste" className="input input-bordered w-full" />
                        </div>
                    </div>
                    {/* third row */}
                    <div className="flex gap-5 mb-5">
                        <div className="w-1/2">
                            <label htmlFor="category" className="font-semibold text-lg">Category</label>
                            <input type="text" placeholder="Enter coffee category" id="category" name="category" className="input input-bordered w-full" />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="details" className="font-semibold text-lg">Details</label>
                            <input type="text" placeholder="Enter coffee details" id="details" name="details" className="input input-bordered w-full" />
                        </div>
                    </div>
                    {/* fourth row */}
                    <div className="mb-5">
                        <label htmlFor="photo" className="font-semibold text-lg">Photo</label>
                        <input type="text" placeholder="Enter photo URL" id="photo" name="photo" className="input input-bordered w-full" />
                    </div>
                    <input type="submit" value="Add Coffee" className="btn btn-block normal-case font-rancho text-lg" />
                </form>
            </div>
        </div>
    );
};

export default CreateCoffee;
