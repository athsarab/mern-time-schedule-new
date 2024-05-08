import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    
    <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Sun City</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/buslist">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/form">Book seat</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/insertluggage">insertluggage</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/luggagelist">luggagelist</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/read">My Reservations</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></hr></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
 
    
  )
}

export default Navbar
