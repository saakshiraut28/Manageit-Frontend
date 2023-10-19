# Include Files
```javascript
import { useRecoilState } from 'recoil';
import { alertAtom , loadingAtom } from "../atom/global";
```

# * To Show an alert

1. Set

```javascript
const [alertState, setalertState] = useRecoilState(alertAtom) ;
```

2. Call

```javascript
setShowAlert({open: true, text: "Your text", eventType: "success"})
```

* ```eventType``` Options: `success`, `error`, `info`, `warning`

# * To Show loading screen
1. Setup file

```javascript
const [loading, setloading] = useRecoilState(loadingAtom) ;
```

Without text

```javascript
setloading({open: true}) ;
```

With text 
```javascript
setloading({open: true, text: 'Dheriya rakhiye'}) ;
```
// dont forget to clean out text on loadout
