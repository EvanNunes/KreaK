<?php

namespace App\Controller;

use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class ProductController extends AbstractController
{

    public function __construct(
        private ProductRepository $productRepository

    ) {}

    #[Route('/api/products', name: 'api_products', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $products = $this->productRepository->findAll();

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
}
