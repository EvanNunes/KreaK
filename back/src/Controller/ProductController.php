<?php

namespace App\Controller;

use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

final class ProductController extends AbstractController
{

    public function __construct(
        private ProductRepository $productRepository

    ) {}

    #[Route('/api/products', name: 'api_products', methods: ['GET'])]
    public function api_products(Request $request): JsonResponse
    {
        $category = $request->query->get('category');

        if ($category != null){
            $products = $this->productRepository->findBy(['category' => $category]);
        }
        else {
            $products = $this->productRepository->findAll();
        }

        $data = array_map(function($product) {
            return [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'price' => $product->getPrice(),
                'category' => $product->getCategory(),
                'imageUrl' => $product->getImageUrl(),
            ];
        }, $products);

        return new JsonResponse($data);
    }

    #[Route('/api/products/{id}', name: 'api_products_id', methods: ['GET'])]
    public function api_products_id(int $id): JsonResponse
    {
        $product = $this->productRepository->find($id);

        if (!$product) {
            return new JsonResponse(['error' => 'Produit non trouvé'], 404);
        }

        return new JsonResponse([
            'id' => $product->getId(),
            'name' => $product->getName(),
            'description' => $product->getDescription(),
            'price' => $product->getPrice(),
            'category' => $product->getCategory(),
            'imageUrl' => $product->getImageUrl(),
        ]);
    }

}
