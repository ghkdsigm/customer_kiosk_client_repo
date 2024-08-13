<script>
import { ref, computed } from 'vue';
import { useTitleEN } from '@/composables/useTitleEN';
import { useMparkStore } from '@/store/mpark'

export default {
  name: 'PageMpark',
  setup() {
    const { titleEN } = useTitleEN();
    const mparkStore = useMparkStore();
    const floorTitle = computed(() => mparkStore.floorTitle);
    const imageSrc = ref('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ6nHAV7qhVnIUZ440C2-q0l1DsnmDP-TPAg&s');
    
    const container = ref(null);
    const zoomableElement = ref(null);
    const zoomableStyle = ref({
      transform: 'scale(1) translate(0px, 0px)',
      transformOrigin: '0% 0%', // 기본 transform origin
    });

    let initialDistance = 0;
    let currentScale = 1;
    let isPanning = false;
    let panStart = { x: 0, y: 0 };
    let panPosition = { x: 0, y: 0 };

    const calculateDistance = (touches) => {
      const [touch1, touch2] = touches;
      const dx = touch1.clientX - touch2.clientX;
      const dy = touch1.clientY - touch2.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const getTouchCenter = (touches) => {
      const [touch1, touch2] = touches;
      return {
        x: (touch1.clientX + touch2.clientX) / 2,
        y: (touch1.clientY + touch2.clientY) / 2,
      };
    };

    const onTouchStart = (event) => {
      console.log('Touch Start Event:', event);
      if (event.touches.length === 2) {
        event.preventDefault();
        initialDistance = calculateDistance(event.touches);
        isPanning = false;
      } else if (event.touches.length === 1 && currentScale > 1) {
        isPanning = true;
        panStart = {
          x: event.touches[0].clientX - panPosition.x,
          y: event.touches[0].clientY - panPosition.y,
        };
      }
    };

    const onTouchMove = (event) => {
      console.log('Touch Move Event:', event);
      if (event.touches.length === 2) {
        event.preventDefault();

        const newDistance = calculateDistance(event.touches);
        const scaleChange = newDistance / initialDistance;
        currentScale = Math.min(Math.max(currentScale * scaleChange, 1), 4); // 최소 1배, 최대 4배 확대/축소

        const containerRect = container.value.getBoundingClientRect();
        const newPinchCenter = getTouchCenter(event.touches);

        const centerX = (newPinchCenter.x - containerRect.left) / containerRect.width;
        const centerY = (newPinchCenter.y - containerRect.top) / containerRect.height;

        zoomableStyle.value.transformOrigin = `${centerX * 100}% ${centerY * 100}%`;

        zoomableStyle.value.transform = `scale(${currentScale}) translate(${panPosition.x}px, ${panPosition.y}px)`;

        initialDistance = newDistance;
      } else if (isPanning && event.touches.length === 1) {
        event.preventDefault();

        const newX = event.touches[0].clientX - panStart.x;
        const newY = event.touches[0].clientY - panStart.y;

        const zoomableRect = zoomableElement.value.getBoundingClientRect();
        const containerRect = container.value.getBoundingClientRect();

        const scaledWidth = zoomableRect.width * currentScale;
        const scaledHeight = zoomableRect.height * currentScale;

        const maxX = Math.min(containerRect.width - scaledWidth, 0);
        const maxY = Math.min(containerRect.height - scaledHeight, 0);
        const minX = Math.max(containerRect.width - scaledWidth, 0);
        const minY = Math.max(containerRect.height - scaledHeight, 0);

        panPosition = {
          x: Math.min(Math.max(newX, minX), maxX),
          y: Math.min(Math.max(newY, minY), maxY),
        };

        zoomableStyle.value.transform = `scale(${currentScale}) translate(${panPosition.x}px, ${panPosition.y}px)`;
      }
    };

    const onTouchEnd = () => {
      isPanning = false;

      if (currentScale < 1) {
        currentScale = 1;
        zoomableStyle.value.transform = `scale(1) translate(0px, 0px)`;
        panPosition = { x: 0, y: 0 };
      }
    };

    return {
      titleEN,
      floorTitle,
      imageSrc,
      zoomableElement,
      zoomableStyle,
      onTouchStart,
      onTouchMove,
      onTouchEnd
    };
  }
};
</script>


<style lang="scss" scoped>
.position_info {
  h1 {
    font-size: 10vh;
    line-height: 0.8;
  }
  .position {
    font-size: 2.3vh;
    font-weight: 500;
  }
  .list_item {
    li {
      margin-right: 26px;
      .color {
        display: inline-block;
        width: 0.5vw;
        margin-right: 3px;
        aspect-ratio: 1/1;
        content: '';
        &.c1 {
          background-color: #aed6b3;
        }
        &.c2 {
          background-color: #c2e9ed;
        }
        &.c3 {
          background-color: #f1cdde;
        }
        &.c4 {
          background-color: #83c0bd;
        }
        &.c5 {
          background-color: #7492ac;
        }
      }
    }
  }
}

.facility {
  position: fixed;
  left: 45%;
  bottom: 15vh;
  transform: translateX(-50%);
  .inner {
    display: flex;
    flex-wrap: wrap;
  }
  .btn_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2.7vw;
      aspect-ratio: 1/1;
      background-color: rgb(38, 38, 38, 0.8);
      border-radius: 100%;
      img {
        max-width: 1.4vw;
        height: auto;
      }
    }
    .name {
      font-size: 1.3vh;
      color: #555;
    }
  }
}

.touch-none {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
