const cancerRawData = [
    {   
        key: 0, "pk": 0,
        "radius_mean": 17.99, "texture_mean": 10.38, "perimeter_mean": 122.8, "area_mean": 1001.0, "smoothness_mean": 0.1184,
        "compactness_mean": 0.2776, "concavity_mean": 0.3001, "concave_points_mean": 0.1471, "symmetry_mean": 0.2419, "fractal_dimension_mean": 0.07871,
        "radius_se": 1.095, "texture_se": 0.9053, "perimeter_se": 8.589, "area_se": 153.4, "smoothness_se": 0.006399,
        "compactness_se": 0.04904, "concavity_se": 0.05373, "concave_points_se": 0.01587, "symmetry_se": 0.03003, "fractal_dimension_se": 0.006193,
        "radius_worst": 25.38, "texture_worst": 17.33, "perimeter_worst": 184.6, "area_worst": 2019.0, "smoothness_worst": 0.1622,
        "compactness_worst": 0.6656, "concavity_worst": 0.7119, "concave_points_worst": 0.2654, "symmetry_worst": 0.4601, "diagnosis": 0
    },
    { 
        key: 1, "pk": 1,
        "radius_mean": 20.57, "texture_mean": 17.77, "perimeter_mean": 132.9, "area_mean": 1326.0, "smoothness_mean": 0.08474,
        "compactness_mean": 0.07864, "concavity_mean": 0.0869, "concave_points_mean": 0.07017, "symmetry_mean": 0.1812, "fractal_dimension_mean": 0.05667,
        "radius_se": 0.5435, "texture_se": 0.7339, "perimeter_se": 3.398, "area_se": 74.08, "smoothness_se": 0.005225,
        "compactness_se": 0.01308, "concavity_se": 0.0186, "concave_points_se": 0.0134, "symmetry_se": 0.01389, "fractal_dimension_se": 0.003532,
        "radius_worst": 24.99, "texture_worst": 23.41, "perimeter_worst": 158.8, "area_worst": 1956.0, "smoothness_worst": 0.1238,
        "compactness_worst": 0.1866, "concavity_worst": 0.2416, "concave_points_worst": 0.186, "symmetry_worst": 0.275, "diagnosis": 0
    },
    {
        key: 2, "pk": 2,
        "radius_mean": 19.69, "texture_mean": 21.25, "perimeter_mean": 130.0, "area_mean": 1203.0, "smoothness_mean": 0.1096,
        "compactness_mean": 0.1599,  "concavity_mean": 0.1974, "concave_points_mean": 0.1279, "symmetry_mean": 0.2069, "fractal_dimension_mean": 0.05999, 
        "radius_se": 0.7456, "texture_se": 0.7869, "perimeter_se": 4.585, "area_se": 94.03, "smoothness_se": 0.00615, 
        "compactness_se": 0.04006, "concavity_se": 0.03832, "concave_points_se": 0.02058, "symmetry_se": 0.0225, "fractal_dimension_se": 0.004571, 
        "radius_worst": 23.57, "texture_worst": 25.53, "perimeter_worst": 152.5, "area_worst": 1709.0, "smoothness_worst": 0.1444, 
        "compactness_worst": 0.4245, "concavity_worst": 0.4504, "concave_points_worst": 0.243, "symmetry_worst": 0.3613, "diagnosis": 0
    },
    {
        key: 3, "pk": 3,
        "radius_mean": 19.69, "texture_mean": 21.25, "perimeter_mean": 130.0, "area_mean": 1203.0, "smoothness_mean": 0.1096,
        "compactness_mean": 0.1599,  "concavity_mean": 0.1974, "concave_points_mean": 0.1279, "symmetry_mean": 0.2069, "fractal_dimension_mean": 0.05999, 
        "radius_se": 0.7456, "texture_se": 0.7869, "perimeter_se": 4.585, "area_se": 94.03, "smoothness_se": 0.00615, 
        "compactness_se": 0.04006, "concavity_se": 0.03832, "concave_points_se": 0.02058, "symmetry_se": 0.0225, "fractal_dimension_se": 0.004571, 
        "radius_worst": 23.57, "texture_worst": 25.53, "perimeter_worst": 152.5, "area_worst": 1709.0, "smoothness_worst": 0.1444, 
        "compactness_worst": 0.4245, "concavity_worst": 0.4504, "concave_points_worst": 0.243, "symmetry_worst": 0.3613, "diagnosis": 0
    },
    {
        key: 4, "pk": 4,
        "radius_mean": 19.69, "texture_mean": 21.25, "perimeter_mean": 130.0, "area_mean": 1203.0, "smoothness_mean": 0.1096,
        "compactness_mean": 0.1599,  "concavity_mean": 0.1974, "concave_points_mean": 0.1279, "symmetry_mean": 0.2069, "fractal_dimension_mean": 0.05999, 
        "radius_se": 0.7456, "texture_se": 0.7869, "perimeter_se": 4.585, "area_se": 94.03, "smoothness_se": 0.00615, 
        "compactness_se": 0.04006, "concavity_se": 0.03832, "concave_points_se": 0.02058, "symmetry_se": 0.0225, "fractal_dimension_se": 0.004571, 
        "radius_worst": 23.57, "texture_worst": 25.53, "perimeter_worst": 152.5, "area_worst": 1709.0, "smoothness_worst": 0.1444, 
        "compactness_worst": 0.4245, "concavity_worst": 0.4504, "concave_points_worst": 0.243, "symmetry_worst": 0.3613, "diagnosis": 0
    },
    {
        key: 5, "pk": 5,
        "radius_mean": 19.69, "texture_mean": 21.25, "perimeter_mean": 130.0, "area_mean": 1203.0, "smoothness_mean": 0.1096,
        "compactness_mean": 0.1599,  "concavity_mean": 0.1974, "concave_points_mean": 0.1279, "symmetry_mean": 0.2069, "fractal_dimension_mean": 0.05999, 
        "radius_se": 0.7456, "texture_se": 0.7869, "perimeter_se": 4.585, "area_se": 94.03, "smoothness_se": 0.00615, 
        "compactness_se": 0.04006, "concavity_se": 0.03832, "concave_points_se": 0.02058, "symmetry_se": 0.0225, "fractal_dimension_se": 0.004571, 
        "radius_worst": 23.57, "texture_worst": 25.53, "perimeter_worst": 152.5, "area_worst": 1709.0, "smoothness_worst": 0.1444, 
        "compactness_worst": 0.4245, "concavity_worst": 0.4504, "concave_points_worst": 0.243, "symmetry_worst": 0.3613, "diagnosis": 0
    },
    {
        key: 6, "pk": 6,
        "radius_mean": 19.69, "texture_mean": 21.25, "perimeter_mean": 130.0, "area_mean": 1203.0, "smoothness_mean": 0.1096,
        "compactness_mean": 0.1599,  "concavity_mean": 0.1974, "concave_points_mean": 0.1279, "symmetry_mean": 0.2069, "fractal_dimension_mean": 0.05999, 
        "radius_se": 0.7456, "texture_se": 0.7869, "perimeter_se": 4.585, "area_se": 94.03, "smoothness_se": 0.00615, 
        "compactness_se": 0.04006, "concavity_se": 0.03832, "concave_points_se": 0.02058, "symmetry_se": 0.0225, "fractal_dimension_se": 0.004571, 
        "radius_worst": 23.57, "texture_worst": 25.53, "perimeter_worst": 152.5, "area_worst": 1709.0, "smoothness_worst": 0.1444, 
        "compactness_worst": 0.4245, "concavity_worst": 0.4504, "concave_points_worst": 0.243, "symmetry_worst": 0.3613, "diagnosis": 0
    },
    {
        key: 7, "pk": 7,
        "radius_mean": 19.69, "texture_mean": 21.25, "perimeter_mean": 130.0, "area_mean": 1203.0, "smoothness_mean": 0.1096,
        "compactness_mean": 0.1599,  "concavity_mean": 0.1974, "concave_points_mean": 0.1279, "symmetry_mean": 0.2069, "fractal_dimension_mean": 0.05999, 
        "radius_se": 0.7456, "texture_se": 0.7869, "perimeter_se": 4.585, "area_se": 94.03, "smoothness_se": 0.00615, 
        "compactness_se": 0.04006, "concavity_se": 0.03832, "concave_points_se": 0.02058, "symmetry_se": 0.0225, "fractal_dimension_se": 0.004571, 
        "radius_worst": 23.57, "texture_worst": 25.53, "perimeter_worst": 152.5, "area_worst": 1709.0, "smoothness_worst": 0.1444, 
        "compactness_worst": 0.4245, "concavity_worst": 0.4504, "concave_points_worst": 0.243, "symmetry_worst": 0.3613, "diagnosis": 0
    },
    {
        key: 8, "pk": 8,
        "radius_mean": 19.69, "texture_mean": 21.25, "perimeter_mean": 130.0, "area_mean": 1203.0, "smoothness_mean": 0.1096,
        "compactness_mean": 0.1599,  "concavity_mean": 0.1974, "concave_points_mean": 0.1279, "symmetry_mean": 0.2069, "fractal_dimension_mean": 0.05999, 
        "radius_se": 0.7456, "texture_se": 0.7869, "perimeter_se": 4.585, "area_se": 94.03, "smoothness_se": 0.00615, 
        "compactness_se": 0.04006, "concavity_se": 0.03832, "concave_points_se": 0.02058, "symmetry_se": 0.0225, "fractal_dimension_se": 0.004571, 
        "radius_worst": 23.57, "texture_worst": 25.53, "perimeter_worst": 152.5, "area_worst": 1709.0, "smoothness_worst": 0.1444, 
        "compactness_worst": 0.4245, "concavity_worst": 0.4504, "concave_points_worst": 0.243, "symmetry_worst": 0.3613, "diagnosis": 0
    },
    {
        key: 9, "pk": 9,
        "radius_mean": 19.69, "texture_mean": 21.25, "perimeter_mean": 130.0, "area_mean": 1203.0, "smoothness_mean": 0.1096,
        "compactness_mean": 0.1599,  "concavity_mean": 0.1974, "concave_points_mean": 0.1279, "symmetry_mean": 0.2069, "fractal_dimension_mean": 0.05999, 
        "radius_se": 0.7456, "texture_se": 0.7869, "perimeter_se": 4.585, "area_se": 94.03, "smoothness_se": 0.00615, 
        "compactness_se": 0.04006, "concavity_se": 0.03832, "concave_points_se": 0.02058, "symmetry_se": 0.0225, "fractal_dimension_se": 0.004571, 
        "radius_worst": 23.57, "texture_worst": 25.53, "perimeter_worst": 152.5, "area_worst": 1709.0, "smoothness_worst": 0.1444, 
        "compactness_worst": 0.4245, "concavity_worst": 0.4504, "concave_points_worst": 0.243, "symmetry_worst": 0.3613, "diagnosis": 0
    },
    {
        key: 10, "pk": 10,
        "radius_mean": 19.69, "texture_mean": 21.25, "perimeter_mean": 130.0, "area_mean": 1203.0, "smoothness_mean": 0.1096,
        "compactness_mean": 0.1599,  "concavity_mean": 0.1974, "concave_points_mean": 0.1279, "symmetry_mean": 0.2069, "fractal_dimension_mean": 0.05999, 
        "radius_se": 0.7456, "texture_se": 0.7869, "perimeter_se": 4.585, "area_se": 94.03, "smoothness_se": 0.00615, 
        "compactness_se": 0.04006, "concavity_se": 0.03832, "concave_points_se": 0.02058, "symmetry_se": 0.0225, "fractal_dimension_se": 0.004571, 
        "radius_worst": 23.57, "texture_worst": 25.53, "perimeter_worst": 152.5, "area_worst": 1709.0, "smoothness_worst": 0.1444, 
        "compactness_worst": 0.4245, "concavity_worst": 0.4504, "concave_points_worst": 0.243, "symmetry_worst": 0.3613, "diagnosis": 0
    },
    {
        key: 11, "pk": 11,
        "radius_mean": 19.69, "texture_mean": 21.25, "perimeter_mean": 130.0, "area_mean": 1203.0, "smoothness_mean": 0.1096,
        "compactness_mean": 0.1599,  "concavity_mean": 0.1974, "concave_points_mean": 0.1279, "symmetry_mean": 0.2069, "fractal_dimension_mean": 0.05999, 
        "radius_se": 0.7456, "texture_se": 0.7869, "perimeter_se": 4.585, "area_se": 94.03, "smoothness_se": 0.00615, 
        "compactness_se": 0.04006, "concavity_se": 0.03832, "concave_points_se": 0.02058, "symmetry_se": 0.0225, "fractal_dimension_se": 0.004571, 
        "radius_worst": 23.57, "texture_worst": 25.53, "perimeter_worst": 152.5, "area_worst": 1709.0, "smoothness_worst": 0.1444, 
        "compactness_worst": 0.4245, "concavity_worst": 0.4504, "concave_points_worst": 0.243, "symmetry_worst": 0.3613, "diagnosis": 0
    },
    {
        key: 12, "pk": 12,
        "radius_mean": 19.69, "texture_mean": 21.25, "perimeter_mean": 130.0, "area_mean": 1203.0, "smoothness_mean": 0.1096,
        "compactness_mean": 0.1599,  "concavity_mean": 0.1974, "concave_points_mean": 0.1279, "symmetry_mean": 0.2069, "fractal_dimension_mean": 0.05999, 
        "radius_se": 0.7456, "texture_se": 0.7869, "perimeter_se": 4.585, "area_se": 94.03, "smoothness_se": 0.00615, 
        "compactness_se": 0.04006, "concavity_se": 0.03832, "concave_points_se": 0.02058, "symmetry_se": 0.0225, "fractal_dimension_se": 0.004571, 
        "radius_worst": 23.57, "texture_worst": 25.53, "perimeter_worst": 152.5, "area_worst": 1709.0, "smoothness_worst": 0.1444, 
        "compactness_worst": 0.4245, "concavity_worst": 0.4504, "concave_points_worst": 0.243, "symmetry_worst": 0.3613, "diagnosis": 0
    },
    {
        key: 13, "pk": 13,
        "radius_mean": 19.69, "texture_mean": 21.25, "perimeter_mean": 130.0, "area_mean": 1203.0, "smoothness_mean": 0.1096,
        "compactness_mean": 0.1599,  "concavity_mean": 0.1974, "concave_points_mean": 0.1279, "symmetry_mean": 0.2069, "fractal_dimension_mean": 0.05999, 
        "radius_se": 0.7456, "texture_se": 0.7869, "perimeter_se": 4.585, "area_se": 94.03, "smoothness_se": 0.00615, 
        "compactness_se": 0.04006, "concavity_se": 0.03832, "concave_points_se": 0.02058, "symmetry_se": 0.0225, "fractal_dimension_se": 0.004571, 
        "radius_worst": 23.57, "texture_worst": 25.53, "perimeter_worst": 152.5, "area_worst": 1709.0, "smoothness_worst": 0.1444, 
        "compactness_worst": 0.4245, "concavity_worst": 0.4504, "concave_points_worst": 0.243, "symmetry_worst": 0.3613, "diagnosis": 0
    },
    {
        key: 14, "pk": 14,
        "radius_mean": 19.69, "texture_mean": 21.25, "perimeter_mean": 130.0, "area_mean": 1203.0, "smoothness_mean": 0.1096,
        "compactness_mean": 0.1599,  "concavity_mean": 0.1974, "concave_points_mean": 0.1279, "symmetry_mean": 0.2069, "fractal_dimension_mean": 0.05999, 
        "radius_se": 0.7456, "texture_se": 0.7869, "perimeter_se": 4.585, "area_se": 94.03, "smoothness_se": 0.00615, 
        "compactness_se": 0.04006, "concavity_se": 0.03832, "concave_points_se": 0.02058, "symmetry_se": 0.0225, "fractal_dimension_se": 0.004571, 
        "radius_worst": 23.57, "texture_worst": 25.53, "perimeter_worst": 152.5, "area_worst": 1709.0, "smoothness_worst": 0.1444, 
        "compactness_worst": 0.4245, "concavity_worst": 0.4504, "concave_points_worst": 0.243, "symmetry_worst": 0.3613, "diagnosis": 0
    },
    {
        key: 15, "pk": 15,
        "radius_mean": 19.69, "texture_mean": 21.25, "perimeter_mean": 130.0, "area_mean": 1203.0, "smoothness_mean": 0.1096,
        "compactness_mean": 0.1599,  "concavity_mean": 0.1974, "concave_points_mean": 0.1279, "symmetry_mean": 0.2069, "fractal_dimension_mean": 0.05999, 
        "radius_se": 0.7456, "texture_se": 0.7869, "perimeter_se": 4.585, "area_se": 94.03, "smoothness_se": 0.00615, 
        "compactness_se": 0.04006, "concavity_se": 0.03832, "concave_points_se": 0.02058, "symmetry_se": 0.0225, "fractal_dimension_se": 0.004571, 
        "radius_worst": 23.57, "texture_worst": 25.53, "perimeter_worst": 152.5, "area_worst": 1709.0, "smoothness_worst": 0.1444, 
        "compactness_worst": 0.4245, "concavity_worst": 0.4504, "concave_points_worst": 0.243, "symmetry_worst": 0.3613, "diagnosis": 0
    },
    {
        key: 16, "pk": 16,
        "radius_mean": 19.69, "texture_mean": 21.25, "perimeter_mean": 130.0, "area_mean": 1203.0, "smoothness_mean": 0.1096,
        "compactness_mean": 0.1599,  "concavity_mean": 0.1974, "concave_points_mean": 0.1279, "symmetry_mean": 0.2069, "fractal_dimension_mean": 0.05999, 
        "radius_se": 0.7456, "texture_se": 0.7869, "perimeter_se": 4.585, "area_se": 94.03, "smoothness_se": 0.00615, 
        "compactness_se": 0.04006, "concavity_se": 0.03832, "concave_points_se": 0.02058, "symmetry_se": 0.0225, "fractal_dimension_se": 0.004571, 
        "radius_worst": 23.57, "texture_worst": 25.53, "perimeter_worst": 152.5, "area_worst": 1709.0, "smoothness_worst": 0.1444, 
        "compactness_worst": 0.4245, "concavity_worst": 0.4504, "concave_points_worst": 0.243, "symmetry_worst": 0.3613, "diagnosis": 0
    },
    {
        key: 17, "pk": 17,
        "radius_mean": 19.69, "texture_mean": 21.25, "perimeter_mean": 130.0, "area_mean": 1203.0, "smoothness_mean": 0.1096,
        "compactness_mean": 0.1599,  "concavity_mean": 0.1974, "concave_points_mean": 0.1279, "symmetry_mean": 0.2069, "fractal_dimension_mean": 0.05999, 
        "radius_se": 0.7456, "texture_se": 0.7869, "perimeter_se": 4.585, "area_se": 94.03, "smoothness_se": 0.00615, 
        "compactness_se": 0.04006, "concavity_se": 0.03832, "concave_points_se": 0.02058, "symmetry_se": 0.0225, "fractal_dimension_se": 0.004571, 
        "radius_worst": 23.57, "texture_worst": 25.53, "perimeter_worst": 152.5, "area_worst": 1709.0, "smoothness_worst": 0.1444, 
        "compactness_worst": 0.4245, "concavity_worst": 0.4504, "concave_points_worst": 0.243, "symmetry_worst": 0.3613, "diagnosis": 0
    },
    {
        key: 18, "pk": 18,
        "radius_mean": 19.69, "texture_mean": 21.25, "perimeter_mean": 130.0, "area_mean": 1203.0, "smoothness_mean": 0.1096,
        "compactness_mean": 0.1599,  "concavity_mean": 0.1974, "concave_points_mean": 0.1279, "symmetry_mean": 0.2069, "fractal_dimension_mean": 0.05999, 
        "radius_se": 0.7456, "texture_se": 0.7869, "perimeter_se": 4.585, "area_se": 94.03, "smoothness_se": 0.00615, 
        "compactness_se": 0.04006, "concavity_se": 0.03832, "concave_points_se": 0.02058, "symmetry_se": 0.0225, "fractal_dimension_se": 0.004571, 
        "radius_worst": 23.57, "texture_worst": 25.53, "perimeter_worst": 152.5, "area_worst": 1709.0, "smoothness_worst": 0.1444, 
        "compactness_worst": 0.4245, "concavity_worst": 0.4504, "concave_points_worst": 0.243, "symmetry_worst": 0.3613, "diagnosis": 0
    },
    {
        key: 19, "pk": 19,
        "radius_mean": 19.69, "texture_mean": 21.25, "perimeter_mean": 130.0, "area_mean": 1203.0, "smoothness_mean": 0.1096,
        "compactness_mean": 0.1599,  "concavity_mean": 0.1974, "concave_points_mean": 0.1279, "symmetry_mean": 0.2069, "fractal_dimension_mean": 0.05999, 
        "radius_se": 0.7456, "texture_se": 0.7869, "perimeter_se": 4.585, "area_se": 94.03, "smoothness_se": 0.00615, 
        "compactness_se": 0.04006, "concavity_se": 0.03832, "concave_points_se": 0.02058, "symmetry_se": 0.0225, "fractal_dimension_se": 0.004571, 
        "radius_worst": 23.57, "texture_worst": 25.53, "perimeter_worst": 152.5, "area_worst": 1709.0, "smoothness_worst": 0.1444, 
        "compactness_worst": 0.4245, "concavity_worst": 0.4504, "concave_points_worst": 0.243, "symmetry_worst": 0.3613, "diagnosis": 0
    },
    {
        key: 20, "pk": 20,
        "radius_mean": 19.69, "texture_mean": 21.25, "perimeter_mean": 130.0, "area_mean": 1203.0, "smoothness_mean": 0.1096,
        "compactness_mean": 0.1599,  "concavity_mean": 0.1974, "concave_points_mean": 0.1279, "symmetry_mean": 0.2069, "fractal_dimension_mean": 0.05999, 
        "radius_se": 0.7456, "texture_se": 0.7869, "perimeter_se": 4.585, "area_se": 94.03, "smoothness_se": 0.00615, 
        "compactness_se": 0.04006, "concavity_se": 0.03832, "concave_points_se": 0.02058, "symmetry_se": 0.0225, "fractal_dimension_se": 0.004571, 
        "radius_worst": 23.57, "texture_worst": 25.53, "perimeter_worst": 152.5, "area_worst": 1709.0, "smoothness_worst": 0.1444, 
        "compactness_worst": 0.4245, "concavity_worst": 0.4504, "concave_points_worst": 0.243, "symmetry_worst": 0.3613, "diagnosis": 0
    },
    {
        key: 21, "pk": 21,
        "radius_mean": 19.69, "texture_mean": 21.25, "perimeter_mean": 130.0, "area_mean": 1203.0, "smoothness_mean": 0.1096,
        "compactness_mean": 0.1599,  "concavity_mean": 0.1974, "concave_points_mean": 0.1279, "symmetry_mean": 0.2069, "fractal_dimension_mean": 0.05999, 
        "radius_se": 0.7456, "texture_se": 0.7869, "perimeter_se": 4.585, "area_se": 94.03, "smoothness_se": 0.00615, 
        "compactness_se": 0.04006, "concavity_se": 0.03832, "concave_points_se": 0.02058, "symmetry_se": 0.0225, "fractal_dimension_se": 0.004571, 
        "radius_worst": 23.57, "texture_worst": 25.53, "perimeter_worst": 152.5, "area_worst": 1709.0, "smoothness_worst": 0.1444, 
        "compactness_worst": 0.4245, "concavity_worst": 0.4504, "concave_points_worst": 0.243, "symmetry_worst": 0.3613, "diagnosis": 0
    },
    {
        key: 22, "pk": 22,
        "radius_mean": 19.69, "texture_mean": 21.25, "perimeter_mean": 130.0, "area_mean": 1203.0, "smoothness_mean": 0.1096,
        "compactness_mean": 0.1599,  "concavity_mean": 0.1974, "concave_points_mean": 0.1279, "symmetry_mean": 0.2069, "fractal_dimension_mean": 0.05999, 
        "radius_se": 0.7456, "texture_se": 0.7869, "perimeter_se": 4.585, "area_se": 94.03, "smoothness_se": 0.00615, 
        "compactness_se": 0.04006, "concavity_se": 0.03832, "concave_points_se": 0.02058, "symmetry_se": 0.0225, "fractal_dimension_se": 0.004571, 
        "radius_worst": 23.57, "texture_worst": 25.53, "perimeter_worst": 152.5, "area_worst": 1709.0, "smoothness_worst": 0.1444, 
        "compactness_worst": 0.4245, "concavity_worst": 0.4504, "concave_points_worst": 0.243, "symmetry_worst": 0.3613, "diagnosis": 0
    },
    {
        key: 23, "pk": 23,
        "radius_mean": 19.69, "texture_mean": 21.25, "perimeter_mean": 130.0, "area_mean": 1203.0, "smoothness_mean": 0.1096,
        "compactness_mean": 0.1599,  "concavity_mean": 0.1974, "concave_points_mean": 0.1279, "symmetry_mean": 0.2069, "fractal_dimension_mean": 0.05999, 
        "radius_se": 0.7456, "texture_se": 0.7869, "perimeter_se": 4.585, "area_se": 94.03, "smoothness_se": 0.00615, 
        "compactness_se": 0.04006, "concavity_se": 0.03832, "concave_points_se": 0.02058, "symmetry_se": 0.0225, "fractal_dimension_se": 0.004571, 
        "radius_worst": 23.57, "texture_worst": 25.53, "perimeter_worst": 152.5, "area_worst": 1709.0, "smoothness_worst": 0.1444, 
        "compactness_worst": 0.4245, "concavity_worst": 0.4504, "concave_points_worst": 0.243, "symmetry_worst": 0.3613, "diagnosis": 0
    },
    {
        key: 24, "pk": 24,
        "radius_mean": 19.69, "texture_mean": 21.25, "perimeter_mean": 130.0, "area_mean": 1203.0, "smoothness_mean": 0.1096,
        "compactness_mean": 0.1599,  "concavity_mean": 0.1974, "concave_points_mean": 0.1279, "symmetry_mean": 0.2069, "fractal_dimension_mean": 0.05999, 
        "radius_se": 0.7456, "texture_se": 0.7869, "perimeter_se": 4.585, "area_se": 94.03, "smoothness_se": 0.00615, 
        "compactness_se": 0.04006, "concavity_se": 0.03832, "concave_points_se": 0.02058, "symmetry_se": 0.0225, "fractal_dimension_se": 0.004571, 
        "radius_worst": 23.57, "texture_worst": 25.53, "perimeter_worst": 152.5, "area_worst": 1709.0, "smoothness_worst": 0.1444, 
        "compactness_worst": 0.4245, "concavity_worst": 0.4504, "concave_points_worst": 0.243, "symmetry_worst": 0.3613, "diagnosis": 0
    },
];

const hisColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
];

const hisData = [];
for (let i = 0; i < 46; i++) {
    hisData.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

const pData = [
    {key: '1',name: 'P1',reward: 98,},
    {key: '2',name: 'P2',reward: 98,},
    {key: '3',name: 'P3',reward: 98,},
    {key: '4',name: 'P4',reward: 34,},
    {key: '5',name: 'P5',reward: 54,},
    {key: '6',name: 'P6',reward: 78,},
    {key: '7',name: 'P7',reward: 83,},
    {key: '8',name: 'P8',reward: 19,},
    {key: '9',name: 'P9',reward: 20,},
    {key: '10',name: 'P10',reward: 33,}
];

const nData = [
    {key: '1',name: 'N1',reward: 32,},
    {key: '2',name: 'N2',reward: 43,},
    {key: '3',name: 'N3',reward: 71,},
    {key: '4',name: 'N4',reward: 35,},
    {key: '5',name: 'N5',reward: 59,},
    {key: '6',name: 'N6',reward: 48,},
    {key: '7',name: 'N7',reward: 56,},
    {key: '8',name: 'N8',reward: 29,},
    {key: '9',name: 'N9',reward: 10,},
    {key: '10',name: 'N10',reward: 80,}
];