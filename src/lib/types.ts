export interface AvatarData {
  targetId: number;
  state: string;
  imageUrl: string;
  version: string;
}

export interface ImageData {
  camera: Camera;
  aabb: AABB;
  mtl: string;
  obj: string;
  textures: string[];
}

export interface AABB {
  min: Vec3;
  max: Vec3;
}

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface Camera {
  position: Vec3;
  direction: Vec3;
  fov: number;
}

export interface CameraSettings {
  camera: Camera;
  aabb: AABB;
}

export interface UsersData {
  previousPageCursor: null;
  nextPageCursor: string;
  data: Datum[];
}

export interface Datum {
  previousUsernames: any[];
  hasVerifiedBadge: boolean;
  id: number;
  name: string;
  displayName: string;
}
