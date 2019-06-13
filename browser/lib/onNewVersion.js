export default function onNewVersion(handler) {
  let lastBlurredAt

  async function checkForNewVersion(){
    if (await isThereANewVersion()) handler()
  }

  checkForNewVersion()

  window.addEventListener('focus', () => {
    if (!lastBlurredAt) return
    const now = Date.now()
    const minutesSinceBlur = ((now - lastBlurredAt) / 1000) / 60
    if (minutesSinceBlur < 20) return
    checkForNewVersion()
  })

  window.addEventListener('blur', function() {
    lastBlurredAt = Date.now()
  })
}

async function isThereANewVersion() {
  const response = await fetch(`${window.location.origin}/sw/checkForNewVersion`)
  const { newVersion } = await response.json()
  return !!newVersion
}

DEBUG.isThereANewVersion = isThereANewVersion
