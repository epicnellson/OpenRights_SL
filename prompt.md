Fix the hamburger menu. It is not 
clicking on small screens.

Read these files first:
- css/style.css
- js/utils.js
- index.html (check the navbar structure)

Find exactly why the hamburger click 
is not working and fix it.

Common causes to check:

1. EVENT LISTENER NOT ATTACHING
Check if the hamburger button element 
exists when the event listener runs.
Fix: wrap in DOMContentLoaded:

document.addEventListener(
  'DOMContentLoaded', () => {
    const hamburger = document.getElementById(
      'hamburger'
    )
    const mobileMenu = document.getElementById(
      'mobile-menu'
    )
    
    if (!hamburger) {
      console.error('Hamburger not found')
      return
    }
    if (!mobileMenu) {
      console.error('Mobile menu not found')
      return
    }
    
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation()
      const isOpen = mobileMenu.classList
        .contains('menu-open')
      mobileMenu.classList.toggle('menu-open')
      hamburger.setAttribute(
        'aria-expanded', 
        String(!isOpen)
      )
    })
    
    document.addEventListener('click', (e) => {
      const navbar = document.getElementById(
        'navbar'
      )
      if (navbar && !navbar.contains(e.target)) {
        mobileMenu.classList.remove('menu-open')
        hamburger.setAttribute(
          'aria-expanded', 'false'
        )
      }
    })
  }
)

2. CSS BLOCKING THE CLICK
Check if any element is overlapping 
the hamburger button with a higher z-index.
Check if pointer-events is set to none 
on the button or a parent.

Fix: add to css/style.css:
#hamburger {
  position: relative;
  z-index: 60;
  cursor: pointer;
  pointer-events: auto;
  -webkit-tap-highlight-color: transparent;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  padding: 8px;
}

3. MOBILE MENU NOT SHOWING
Check if the mobile menu has the 
correct CSS to show when menu-open 
class is added.

Fix: add to css/style.css:
#mobile-menu {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  display: block !important;
}

#mobile-menu.menu-open {
  max-height: 500px;
}

4. HAMBURGER HIDDEN ON WRONG BREAKPOINT
Check if the hamburger button is being 
hidden at the wrong screen size.
It must be visible on mobile screens.

Fix: make sure the hamburger has NO 
hidden class by default. Only desktop 
nav links should be hidden on mobile.

5. DUPLICATE EVENT LISTENERS
If initNavbar is called multiple times,
the hamburger gets multiple listeners.
Fix: add a guard:

let navbarInitialized = false

const initNavbar = () => {
  if (navbarInitialized) return
  navbarInitialized = true
  // ... rest of navbar code
}

After finding the exact cause, fix it 
in the affected files only.

Apply the fix to ALL HTML pages so 
every page has a working hamburger.

Write fixes directly to disk.
Tell me exactly what was broken 
and what you fixed.