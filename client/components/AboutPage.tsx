import AboutPagePhoto from '../src/images/about-page-photo.jpeg'

export default function About() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <h2>About Me & The Hub</h2>

      <img
        src={AboutPagePhoto}
        alt="Dave and Maioha-Mataio Lepou - Samoa 2026"
        style={{
          width: '200px',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '50%',
          float: 'left',
          marginRight: '1.5rem',
          marginBottom: '1rem',
        }}
      />

      <p>
        Malo ni, Bula, Malo e lelei and Talofa Lava! My name is Dave Lepou.{' '}
        <em>Tastes of the Pasefika</em> started as a deeply personal mission for
        me. Growing up, some of my fondest childhood memories were rooted in the
        kitchen, surrounded by the traditional Samoan dishes and flavours passed
        down lovingly by my grandmother, mother, and family.
      </p>

      <p>
        My ultimate goal for my own children and future grandchildren is to pass
        these tastes and traditions on so they always know where they come from.
        But as I built this, I realized food culture isn't meant to be locked
        behind one family's doors—it's a shared heritage.
      </p>

      <p>
        That’s why this space is growing into something bigger. I want this to
        be a place where Polynesians from all across the Pacific can contribute
        their own recipes, share the memories connected to them, and help build
        a collective cookbook of our people.
      </p>

      <div style={{ clear: 'both' }}></div>
    </div>
  )
}
