<template>
  <div
    class="pointer-events-none flex items-center self-center"
    v-html="icon"
  />
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  name: {
    type: String,
    default: '',
  },

  size: {
    type: String,
    required: false,
    default: 'sm',
    validator: (size) => ['', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'].includes(size),
  },

  fill: {
    type: String,
    required: false,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },

  stroke: {
    type: String,
    required: false,
    default: '',
  },

  strokeWidth: {
    type: String,
    required: false,
    default: '',
  },
});

const icon = ref('');

const importedIcon = () => {
  try {
    const svgs = import.meta.glob(`../assets/icons/*.svg`, {
      as: 'raw',
      eager: true,
    });

    return svgs[`../assets/icons/${props.name}.svg`];
  } catch (err) {
    console.log(err);
    return '';
  }
};

const iconSize = computed(() => {
  const sizes = {
    xs: '12',
    sm: '18',
    md: '24',
    lg: '32',
    xl: '44',
    xxl: '70',
  };
  return sizes[props.size] || sizes.sm;
});

const geticon = () => {
  let res = importedIcon() || '';

  if (props.fill || props.stroke) {
    if (res.match(/path/)) {
      res = res.replace(/path/g, `path class="${props.fill} ${props.stroke}"`);
    }
    if (res.match(/rect/)) {
      res = res.replace(/rect/g, `rect class="${props.fill} ${props.stroke}"`);
    }
  }

  res = res.replace(/svg/, `svg width="${iconSize.value}" height="${iconSize.value}"`);

  res = res
    .replace(/width="([\d]+)"/, `width="${iconSize.value}"`)
    .replace(/height="([\d]+)"/, `height="${iconSize.value}"`)
    .replace(
      /class="/g,
      `class="${props.fill} ${props.stroke} ${props.loading ? 'animate-bounce' : ''} `,
    );

  if (props.strokeWidth) {
    res = res.replace(/stroke-width="(\d+)"/g, `stroke-width="${props.strokeWidth}"`);
  }

  return res;
};

icon.value = geticon();

watch(
  () => [props.name, props.fill, props.stroke, props.strokeWidth],
  () => {
    icon.value = geticon();
  },
);
</script>
