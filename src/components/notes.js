"use client";

function Notes({ gun, isAuthenticated }) {

    let resp = (
        <div id="notes-div">
            <form id="notes-form">
                <div className="flex gap-1">
                    <input id="new-message"
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    <input id="speak" className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 mx-2 rounded"
                        type="submit" value="speak" />
                </div>
            </form>
            <ul className="flex flex-col gap-2 items-center justify-center p-4 my-2"></ul>
        </div>
    )

    if (!isAuthenticated) {
        resp = (<div></div>)
    }

    return resp
}

export default Notes