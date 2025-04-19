import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
    return (
        <footer className="bg-gradient-to-b from-transparent to-indigo-100 border-t border-indigo-200">
            <div className="mx-auto px-4 py-10 max-w-7xl">
                <div className="flex flex-col items-start">
                    <Link to="/" className="mb-4">
                        <Logo width="100px" />
                    </Link>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="mb-4 text-xs font-semibold uppercase text-indigo-600">Company</h3>
                        <ul className="space-y-2">
                            <li><Link to="#" className="text-indigo-800 hover:text-indigo-950">Features</Link></li>
                            <li><Link to="#" className="text-indigo-800 hover:text-indigo-950">Pricing</Link></li>
                            <li><Link to="#" className="text-indigo-800 hover:text-indigo-950">Affiliate Program</Link></li>
                            <li><Link to="#" className="text-indigo-800 hover:text-indigo-950">Press Kit</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-xs font-semibold uppercase text-indigo-600">Support</h3>
                        <ul className="space-y-2">
                            <li><Link to="#" className="text-indigo-800 hover:text-indigo-950">Account</Link></li>
                            <li><Link to="#" className="text-indigo-800 hover:text-indigo-950">Help</Link></li>
                            <li><Link to="#" className="text-indigo-800 hover:text-indigo-950">Contact Us</Link></li>
                            <li><Link to="#" className="text-indigo-800 hover:text-indigo-950">Customer Support</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-xs font-semibold uppercase text-indigo-600">Legals</h3>
                        <ul className="space-y-2">
                            <li><Link to="#" className="text-indigo-800 hover:text-indigo-950">Terms & Conditions</Link></li>
                            <li><Link to="#" className="text-indigo-800 hover:text-indigo-950">Privacy Policy</Link></li>
                            <li><Link to="#" className="text-indigo-800 hover:text-indigo-950">Licensing</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="border-t border-indigo-200"></div>
            <div className="mx-auto px-4 py-4 max-w-7xl">
                <span className="text-sm text-indigo-600">&copy; 2025 MegaBlog. All rights reserved.</span>
            </div>
        </footer>
    );
}

export default Footer;
