function Footer() {
    return (
<footer className="bg-gray-900 text-white py-8 mt-auto">
<div className="container mx-auto text-center space-y-3">
          <h2 className="text-lg font-semibold">Game Explorer</h2>
          <p className="text-sm">Explora, descubre y disfruta de los mejores videojuegos.</p>
  
          <div className="flex justify-center space-x-6">
            <a href="/" className="hover:text-gray-400">Inicio</a>
            <a href="/games" className="hover:text-gray-400">Explorar Juegos</a>
            <a href="https://rawg.io/" target="_blank" className="hover:text-gray-400">RAWG API</a>
          </div>
  
          <p className="text-xs mt-2">
            © {new Date().getFullYear()} Game Explorer - Todos los derechos reservados.
          </p>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  