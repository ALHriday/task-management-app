
const CreateTodo = () => {
    return (
        <div>
            <div className="w-full flex flex-col gap-2 my-4 bg-slate-800">
                <label>Title : </label>
                <input className="w-full p-2 rounded-sm" type="text" maxLength={50} />
                <label>Description : </label>
                <textarea className="min-h-20 max-h-36 w-full p-2 rounded-sm" maxLength={200}></textarea>
                <button className="btn bg-blue-500">Save</button>
            </div>
        </div>
    );
};

export default CreateTodo;