import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'

const ShowStarsLength = ({ num }) => {
   const a = []
      for (let i = 1; i <= num; i++) {
         a.push(i)
      }
      return (
         <>
            {a.length > 0 ? a.map((item, index) => (
               <FontAwesomeIcon key={index} icon={faStar} />
            )) : (
               <h4 style={{ fontSize: "14px", margin: '0px', padding: '0px' }}>Sin Estrellas</h4>
            )}
         </>
      )
}

ShowStarsLength.propTypes = {
   num: PropTypes.number
}

export {
   ShowStarsLength,
}