import React from "react";


const FooterPage = () => {

    return(
        <footer style={{ backgroundColor: '#f0f0f0', padding: '20px', textAlign: 'center' }}>
            <div className="w-full">
                <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
            <p>SHETUKA STORE</p>
              <p>© {(new Date().getFullYear())}</p>
                </div>
            </div>
        </footer>

    )
}

export default FooterPage;