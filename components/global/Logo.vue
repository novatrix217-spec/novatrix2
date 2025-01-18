<template>
  <NuxtLink to="/" aria-label="Novatrix AI">
    <div class="logo-container">
      <h1 class="logo-text">Novatrix<span>AI.</span></h1>
    </div>
  </NuxtLink>
</template>

<style>
.logo-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-text {
  font-size: 2.5rem;
  color: #00aeef;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  text-shadow: 0 0 10px rgba(0, 174, 239, 0.7);
}

.logo-text span {
  color: #8a2be2;
}

.logo-icon {
  transition: transform 0.3s ease, filter 0.3s ease;
}

.logo-icon:hover {
  transform: rotate(20deg);
  filter: drop-shadow(0 0 10px rgba(138, 43, 226, 0.9));
}
</style>
