import Banner from './banner';

const Board = () => {


  return (
    <div className="displayBoard">
      <Banner src="\src\assets\Camel Beauty Contest.jpg" message="Camel Beauty Contest" date="1:00pm"/>
      <Banner src="\src\assets\Qasr Al Watan.jpg" message="Qasr Al Watan" date="9:00pm"/>
      <Banner src="\src\assets\Art House.jpg" message="Art House Cafe" date="6:00pm"/>
      <Banner src="\src\assets\Abrahamic Family House.jpeg" message="Abrahamic Family House" date="6:30pm"/>
      <Banner src="\src\assets\Camping.jpg" message="Mleiha Camping" date="8:00am"/>
      <Banner src="\src\assets\Al Ain.jpeg" message="Al Ain Trip" date="10:30pm"/>
      <Banner src="\src\assets\Dune Bashing.jpeg" message="Desert Safari" date="5:45pm"/>
      <Banner src="\src\assets\Louvre.jpg" message="Louvre Abu Dhabi" date="2:30pm"/>
      <Banner src="\src\assets\Miracle Garden.jpg" message="Dubai Miracle Garden" date="7:30pm"/>
      <Banner src="\src\assets\Mangrove.jpg" message="Mangrove Boat Trip" date="3:30pm"/>
    </div>
  )
}

export default Board;