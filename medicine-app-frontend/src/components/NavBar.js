// './components/NavBar.js'

const NavBar = () => {

    return (
        <>
        <h1>Drug Company MERN App</h1>
	    <hr></hr>
        <div id="top_nav">
		    <nav>
			    <a href="/">Home</a> |
                <div className="dropdown">
                    <span><a>Admin</a></span>
                    <div className="dropdown-content">
                        <p><a href="/addnew">Add new</a></p>
                        <p><a href="/admin">Edit/delete</a></p>
                    </div>
			    </div>
		    </nav>
	    </div>
        </>
    )
}

export default NavBar