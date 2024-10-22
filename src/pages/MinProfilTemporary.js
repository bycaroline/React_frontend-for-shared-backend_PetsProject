import React from 'react'
import { Link } from 'react-router-dom'

function MinProfilTemporary() {
    return (
        <div>Testing med sida som ska visas när inloggad
            <h1>Testar här med omdirigering</h1>
            <Link to="/startsida" style={{ textDecoration: 'none' }}>
                <strong style={{ color: 'black', textAlign: 'right' }}>Gå tillbaka</strong>
            </Link>
        </div>
    )
}

export default MinProfilTemporary