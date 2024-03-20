

    import React, { children } from 'react'
import { Navigate } from 'react-router-dom'

    export default function ProtectedRoute( {children} ) {


        if (localStorage.getItem( "tokn" ) === null ){



            return <Navigate to="/Login"/>
        }

            return <>
            
                {children}

            </>
    }
