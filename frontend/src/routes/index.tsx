import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="p-10">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold mb-4">
          📚 Book Haven
        </h1>

        <p className="text-lg mb-8">
          Buy and sell books easily with readers around the world.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg"
          >
            Register
          </Link>

          <Link
            to="/books"
            className="px-6 py-3 border rounded-lg"
          >
            Browse Books
          </Link>
        </div>
      </section>
      </div>
       )
     } 

      {/* Featured Books */}
   {/*  <section>
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Books
        </h2>

        <div className="grid grid-cols-3 gap-6">
          <div className=" border p-4 rounded-lg">
            <h3 className="font-semibold">
              Atomic Habits
            </h3>
            <p>₹250</p>
          </div>

          <div className="border p-4 rounded-lg">
            <h3 className="font-semibold">
              Rich Dad Poor Dad
            </h3>
            <p>₹300</p>
          </div>

          <div className="border p-4 rounded-lg">
            <h3 className="font-semibold">
              Clean Code
            </h3>
            <p>₹450</p>
          </div>
        </div>
      </section>
    </div>
  )
     } 
      */}
      