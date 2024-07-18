module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    important: false,
    darkMode: 'class', // Tailwindcss 3.0 default is 'media',  'class'
    theme: {
      extend: {
        colors: {
          primary: '#1F2733',
          primaryHover: '#434A66',
          secondary: '#fff',
          secondaryHover: '#eee',
          third: '#11216b',
          thirdHover: '#182f96',
          fourth: '#cfcfcf4a',
          fourthHover: '#cfcfcf4a',
          fifth: '#42b883',
          fifthHover: '#42d392',
          sixth: '#fff',
          sixthHover: '#ccc',
          dark: '#1a91da',
          light: '#a5d0f5',
          tranparent: 'transparent',      
        },
        container: {
          // screen: {
          //   '3xl': { max: '1800px' },
          // },
          padding: {
            DEFAULT: '1rem',
            sm: '2rem',
            lg: '4rem',
            xl: '5rem',
            '2xl': '0rem',
          },
          margin: {
            '35vh': '35vh',
          },
          fontSize: {
            '20vh': '20vh',
            '19vh': '19vh',
            '18vh': '18vh',
            '17vh': '17vh',
            '16vh': '16vh',
            '15vh': '15vh',
            '14vh': '14vh',
            '13vh': '13vh',
            '12vh': '12vh',
            '11vh': '11vh',
            '10vh': '10vh',
            '9vh': '9vh',
            '8vh': '8vh',
            '7vh': '7vh',
            '6vh': '6vh',
            '5vh': '5vh',
            '4vh': '4vh',
            '3vh': '3vh',
          },
        },
      },
    },
    corePlugins: {
      container: false,
    },
    plugins: [
      function ({ addComponents }) {
        addComponents({
          '.container': {
            maxWidth: '100%',
            '@screen sm': {
              maxWidth: '640px',
            },
            '@screen md': {
              maxWidth: '768px',
            },
            '@screen lg': {
              maxWidth: '1280px',
            },
            '@screen xl': {
              maxWidth: '1600px',
            },
            '@screen 2xl': {
              maxWidth: '2900px',
            },
          },
        });
      },
    ],
  };