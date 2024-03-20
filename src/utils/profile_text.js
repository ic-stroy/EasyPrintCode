const handleNavLink = ({ isActive }) => 
'profile_header_text' + (isActive ? 'profile_header_text_active' : '');

export { handleNavLink };