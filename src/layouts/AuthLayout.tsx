import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/auth/auth.store';
import img from '../assets/BlueSky Banking.png'; // Importação correta da imagem

export const AuthLayout = () => {
    const authStatus = useAuthStore(state => state.status);

    if (authStatus === 'pending') return <div>Cargando...</div>;
    if (authStatus === 'authorized') return <Navigate to="/home" />;

    return (
        <div>
            <main>
                <section className="flex flex-col md:flex-row h-screen items-center">
                    <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
                        <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
                        <div className="w-full h-100">
                            <Outlet />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};
