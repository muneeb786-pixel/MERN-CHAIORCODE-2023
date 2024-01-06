const ProtectedRoutes = (props) => {
    const isLoggesIn = true;
    { isLoggesIn ? {props.children} : <App/>}

}

export default ProtectedRoutes;