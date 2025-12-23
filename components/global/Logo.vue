<template>
  <a href="/" aria-label="Novatrix AI" class="logo-link">
    <div class="logo-container">
      <h1 class="logo-text">
        <span class="text-part hidden md:inline">N</span><img src="/logo.png" alt="" class="logo-icon" width="55" height="70" /><span class="text-part hidden md:inline">vatrix</span><span class="ai-part">AI.</span>
      </h1>
    </div>
  </a>
</template>

<style scoped>
.logo-link {
  display: inline-block;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo-text {
  display: flex;
  align-items: center;
  font-size: 2.8rem;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  gap: 0;
}

@media (min-width: 768px) {
  .logo-text {
    font-size: 2.8rem;
  }
}

.text-part {
  background: linear-gradient(135deg, #2563EB 0%, #9333EA 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  pointer-events: none;
}

.ai-part {
  background: linear-gradient(135deg, #9333EA 0%, #2563EB 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-left: 2px;
  pointer-events: none;
}

.logo-icon {
  transition: transform 0.3s ease, filter 0.3s ease;
  margin: 0 -2px;
  position: relative;
  top: 2px;
  pointer-events: none;
}

.logo-link:hover .logo-icon {
  transform: rotate(20deg) scale(1.05);
  filter: drop-shadow(0 0 10px rgba(147, 51, 234, 0.5));
}
</style>
