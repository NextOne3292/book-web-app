import {
  Outlet,
  Link,
  createRootRoute,
} from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const token =
    localStorage.getItem('token')

  let role = null

  if (token) {
    try {
      const payload = JSON.parse(
        atob(token.split('.')[1]),
      )

      role = payload.role
    } catch {
      role = null
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-bold text-center">
            📚 Book Haven
          </h1>

          <nav className="flex flex-wrap justify-center gap-3 sm:gap-5 text-sm sm:text-base">
            {!token && (
              <>
                <Link to="/">Home</Link>
                <Link to="/books">Books</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">
                  Register
                </Link>
              </>
            )}

            {role === 'BUYER' && (
              <>
                <Link to="/">Home</Link>
                <Link to="/books">Books</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/order">
  My Orders
</Link>

                <button
                  onClick={handleLogout}
                  className="text-red-600"
                >
                  Logout
                </button>
              </>
            )}

            {role === 'SELLER' && (
              <>
                <Link to="/seller-books">
                  My Books
                </Link>

                <Link to="/add-book">
                  Add Book
                </Link>
                <Link to="/seller-orders">
  Sales History
</Link>

                <button
                  onClick={handleLogout}
                  className="text-red-600"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t py-4 text-center">
        © 2026 Book Haven
      </footer>
    </div>
  )
}