import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function NewChar() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        navigate('/view', { 
            state: { uploadedData: {id: "character"} }, 
            replace: true 
        });
    }, [navigate, location]);

    return null;
}