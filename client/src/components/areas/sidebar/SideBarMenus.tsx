import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppState } from '../../../store/AppState'
import { faRegistered, faSignInAlt, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import Registration from '../../auth/Registration'
import { Link } from 'react-router-dom'
import Login from '../../auth/Login'
import Logout from '../../auth/Logout'

const SideBarMenus = () => {
  
  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showLogout, setShowLogout] = useState(false)

  const user = useSelector((state: AppState) => state.user)

  useEffect(() => { 
    console.log("Sidebar user", user);  
  }, [user])

  const onClickToggleRegister = () => {
    setShowRegister(!showRegister);
  }

  const onClickToggleLogin = () => {
    setShowLogin(!showLogin);
  }

  const onClickToggleLogout = () => {
    setShowLogout(!showLogout);
  }

  return (
    <React.Fragment>
        <ul>
            {user ? (
              <li>
                <FontAwesomeIcon icon={faUser} />
                <span className="menu-name">
                  <Link to={`/userprofile/${user?.id}`}>{user?.userName}</Link>
                </span>
              </li>
            ) : null}

            {user ? null : (
              <li>
                <FontAwesomeIcon icon={faRegistered} />
                <span onClick={onClickToggleRegister} className="menu-name">
                  register
                </span>
                <Registration
                  isOpen={showRegister}
                  onClickToggle={onClickToggleRegister}
                />
              </li>
            )}

          {user ? null : (
            <li>
              <FontAwesomeIcon icon={faSignInAlt} />
              <span onClick={onClickToggleLogin} className="menu-name">
                login
              </span>
              <Login isOpen={showLogin} onClickToggle={onClickToggleLogin} />
            </li>
          )}

          {user ? (
            <li>
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span onClick={onClickToggleLogout} className="menu-name">
                logout
              </span>
              <Logout isOpen={showLogout} onClickToggle={onClickToggleLogout} />
            </li>
          ) : null}
        </ul>
    </React.Fragment>
  )
}

export default SideBarMenus